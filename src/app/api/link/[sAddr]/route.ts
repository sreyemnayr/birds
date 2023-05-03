import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongoClient"

const url = process.env.MONGODB_URL || ""

export async function GET(request: Request, {params}: {params: {sAddr: string}}) {

  console.log(params)
  
  const sAddress = params.sAddr

  try {
    const client = await clientPromise
      const db = client.db("birds")
      const owners = db.collection("owners")

      const filter = {
        sAddress: sAddress
      }

      const result = await owners.findOne(filter)

      return NextResponse.json({ success: true, result })
      
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, error: error });
    }

}
