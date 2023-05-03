import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongoClient"


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
    const client = await clientPromise
    
      const db = client.db("birds")
      const tokens = db.collection("tokens")

      const filter = {
        owner: sAddress
      }

      const result = await tokens.find(filter).toArray()

      return NextResponse.json({ success: true, result })
      
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, error: error });
    }

}
