// import { ConectoAbi } from "@/contracts/abi";
import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

export const conectoClient = createThirdwebClient({ clientId: process.env.THIRDWEB_CLIENT_ID as string });

export const conectoContract = getContract({
    client: conectoClient,
    chain: baseSepolia,
    address: process.env.CONECTO_CONTRACT_ADDRESS as string,
    // abi: ConectoAbi
});