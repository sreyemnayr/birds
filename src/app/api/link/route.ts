import { PublicKey } from "@solana/web3.js";
import { NextResponse } from "next/server";
import { sign } from 'tweetnacl';
import { encode, decode } from 'bs58';
import clientPromise from "@/lib/mongoClient"
/*
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    sAddress: string;
    eAddress: string;
    signature: string;
  };
}
*/

const url = process.env.MONGODB_URL || ""

export async function POST(request: Request) {

  console.log(request)
  console.log(request.body)

  try {
    
    const {sAddress, eAddress, signature} = await request.json()

    const message = new TextEncoder().encode(`My ethereum address is ${eAddress}`)

    const publicKey = new PublicKey(decode(sAddress))

    if (!sign.detached.verify(message, decode(signature), publicKey?.toBytes() as Uint8Array)) {
      return NextResponse.json({ success: false, error: 'Message signature invalid' })
    } else {
      console.log("Signature verified")
      // log to database
      const client = await clientPromise
      const db = client.db("birds")
      const owners = db.collection("owners")

      const filter = {
        sAddress: sAddress
      }

      const update = {
        $set: {
          sAddress: sAddress,
          eAddress: eAddress,
          sSignature: signature
        }
      }

      const options = {
        upsert: true
      }

      const result = await owners.updateOne(filter, update, options);



      return NextResponse.json({ success: true, result: result })
    }
        
      
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, error: error });
    }

}
