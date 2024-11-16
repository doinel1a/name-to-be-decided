// import { ConectoAbi } from "@/contracts/abi";
import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
require('dotenv').config();

export const conectoClient = createThirdwebClient({ clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string });

export const conectoContract = getContract({
    client: conectoClient,
    chain: baseSepolia,
    address: process.env.NEXT_PUBLIC_CONECTO_CONTRACT_ADDRESS as string,
    // abi: ConectoAbi
});