import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongoClient"

import { BigNumber, Wallet, utils } from 'ethers';

const chain = process.env.NEXT_PUBLIC_CHAIN_ID || 1

const url = process.env.MONGODB_URL || ""

const privateKey = process.env.SIGNER_PRIVATE_KEY;

// This is not accurate
const BOS_ADDRESS = process.env.NEXT_PUBLIC_BOS_CONTRACT || "0x2eFa07CaC3395599db83035D196F2A0e7263F766"

if (!privateKey) {
  throw new Error('No SIGNER private key found');
}

const signingKey = new Wallet(privateKey);

const types = {
  Claim: [
    { name: 'wallet', type: 'address' },
    { name: 'tokenId', type: 'uint256' },
  ],
};

export async function GET(request: Request, {params}: {params: {tokenId: string}}) {

  console.log(params)
  
  const tokenId = params.tokenId

  try {
    const client = await clientPromise
    
      const db = client.db("birds")
      const owners = db.collection("owners")
      const tokens = db.collection("tokens")

      const filter = {
        token_id: parseInt(tokenId)
      }

      const token = await tokens.findOne(filter)

      console.log(token)

      if (token?.burned){
        const owner = await owners.findOne({sAddress: token?.owner})

        const message = {
          wallet: owner?.eAddress,
          tokenId: BigNumber.from(tokenId),
        };

        const domain = {
          name: 'BIRDS_OF_SOLIS',
          version: '1',
          chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
          verifyingContract: BOS_ADDRESS,
        };

        const signature = await signingKey._signTypedData(
          domain,
          types,
          message
        );

        const result = {signature, tokenId, wallet: owner?.eAddress}

        return NextResponse.json({ success: true, result })

      } else {
        return NextResponse.json({ success: false, result: {message: "Not Burned Yet"} })
      }
      
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, error: error });
    }

}


