import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from 'mongodb';

/*
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    sAddress: string;
    eAddress: string;
    signature: string;
  };
}
*/

interface ExtendedRequest extends Request {
  params: {
    sAddr: string
  }
}

const url = process.env.MONGODB_URL || ""

export async function GET(request: Request, {params}: {params: {sAddr: string}}) {

  console.log(params)
  
  const sAddress = params.sAddr

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
      const tokens = db.collection("tokens")

      const filter = {
        owner: sAddress
      }

      const result = await tokens.find(filter).toArray()

      await client.close();

      return NextResponse.json({ success: true, result })
      
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, error: error });
    }

}
