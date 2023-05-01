import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from 'mongodb';

import { BigNumber, Wallet, utils } from 'ethers';

const url = process.env.MONGODB_URL || ""

const privateKey = process.env.SIGNER_PRIVATE_KEY;

// This is not accurate
const BOS_ADDRESS = "0x7B67E3661942FDA6C1D73bBe99856B6a11CdD2EE"

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
    const client = new MongoClient(url, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    
      await client.connect();
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

        await client.close();


        const message = {
          wallet: owner?.eAddress,
          tokenId: BigNumber.from(tokenId),
        };

        const domain = {
          name: 'BIRDS_OF_SOLIS',
          version: '1',
          chainId: 1,
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


