import { NextApiRequest, NextApiResponse } from "next";
import { createThirdwebClient, prepareContractCall, PreparedTransaction, sendTransaction } from "thirdweb";
import { privateKeyToAccount } from "thirdweb/wallets";
import { baseSepolia } from "thirdweb/chains";
import { deployERC1155Contract } from "thirdweb/deploys";
import { getContract, readContract } from "thirdweb";
import { sendBatchTransaction } from "thirdweb";
import { lazyMint, setClaimConditions } from "thirdweb/extensions/erc1155";
import { ConectoAbi } from "@/contracts/abi";
import { getSubscriptionContract, setSubscriptionContract } from "@/contracts/allFunctions";

type SubscriptionDetails = {
    name: string,
    price: number,
    description: string
}

type NFTDetails = {
    name: string,
    description: string,
    image: string | undefined
}

type Params = {
    address: string,
    slugName: string,
    subscriptions: SubscriptionDetails[]
}

function convertSubscriptionDetailsToNFT(subscriptionDetails: SubscriptionDetails[]): NFTDetails[] {
    return subscriptionDetails.map(el => ({
        name: el.name,
        description: el.description,
        image: undefined // or provide a default image URL if available
    }));
}

export async function POST(request: NextApiRequest, context: { params: Params }, res: NextApiResponse) {

    if (context.params.subscriptions.length == 0) {
        console.log("No subscriptions to add");
        res.status(200).json({ message: "No subscriptions to add" });
    }

    const creator_address = context.params.address // '1'
    const slugName = context.params.slugName // '1'

    const thirdwebClient = createThirdwebClient({ secretKey: process.env.THIRDWEB_SECRET_KEY as string });

    const account = privateKeyToAccount({
        client: thirdwebClient,
        privateKey: process.env.PRIVATE_KEY_ADMIN_WALLET as string
    });

    try {
        const generalContract = getContract({
            client: thirdwebClient,
            chain: baseSepolia,
            address: process.env.CONECTO_CONTRACT_ADDRESS as string,
            // abi: ConectoAbi
        });

        // check if subscription contract exists

        let subscriptionContractAddress = await getSubscriptionContract({contract: generalContract,creatorAddress:creator_address});

        // if it doesn't exist, deploy it and save newly created address in general smart contract

        if (subscriptionContractAddress == "") {
            subscriptionContractAddress = await deployERC1155Contract({
                chain: baseSepolia,
                client: thirdwebClient,
                account: account,
                type: "DropERC1155",
                params: {
                    name: slugName + " Subscription",
                    description: slugName + "'s subscription contract",
                    symbol: slugName && slugName.length > 2 ? slugName[0]?.toUpperCase() + slugName.slice(-1) : "NFT",
                }
            });

            console.log("Contract deployed to:", subscriptionContractAddress);

            //TODO save in general smart contract 
            const transaction = setSubscriptionContract({creatorAddress:creator_address, subscriptionContract: subscriptionContractAddress, contract: generalContract});

            await sendTransaction({ transaction, account });
        }

        //create subscrition contract instance

        const subscriptionContract = getContract({
            client: thirdwebClient,
            chain: baseSepolia,
            address: subscriptionContractAddress
        });

        const nftDetails = convertSubscriptionDetailsToNFT(context.params.subscriptions);

        //prepare and save info subscriptions

        const lazyMintTransaction = lazyMint({
            contract: subscriptionContract,
            nfts: nftDetails,
        });

        await sendTransaction({ transaction:lazyMintTransaction, account });

        let transactions:PreparedTransaction[] = [];

        // create array of transactions setting claim conditions (subscription price)

        context.params.subscriptions.forEach((el, i) => {
            let setClaimConditionsTransaction = setClaimConditions({
                contract:subscriptionContract,
                tokenId: BigInt(i),
                phases: [
                  {
                    // maxClaimableSupply: 100n,
                    maxClaimablePerWallet: 1n,
                    price: el.price,
                    startTime: new Date(),
                  },
                 ],
               });
    
            transactions.push(setClaimConditionsTransaction);
        })

        // set claim condition prices

        const waitForReceiptOptions = await sendBatchTransaction({
            account,
            transactions,
        });

        res.status(200).json({ message: "Subscription created succesfully" });

    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }


}
