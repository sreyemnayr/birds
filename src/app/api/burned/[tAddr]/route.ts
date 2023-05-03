import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongoClient"

const url = process.env.MONGODB_URL || ""

const fetcher = (key: string) => fetch(`https://public-api.solscan.io/${key}`, {
  "headers": {
    "accept": "*/*",
    "token": process.env.SOLSCAN_TOKEN || "",
  },
  "method": "GET",
}).then(res => res.json()).then(j => parseInt(j?.tokenInfo?.supply || "1") == 0);

const txFetcher = (key: string) => fetch(`https://public-api.solscan.io/${key}`, {
  "headers": {
    "accept": "*/*",
    "token": process.env.SOLSCAN_TOKEN || "",
  },
  "method": "GET",
}).then(res => res.json()).then(j => j?.[0]?.txHash);

export async function GET(request: Request, {params}: {params: {tAddr: string}}) {
  let error;

  console.log(params)

  const tAddr = params.tAddr

  try {
    const client = await clientPromise
  
    const db = client.db("birds")
    const tokens = db.collection("tokens")

    const filter = {
      account: tAddr
    }

    const token = await tokens.findOne(filter)

    let data = !!token?.burned

    if (data) {
      if (token?.burned_tx !== "") {
        return NextResponse.json({ success: true, result: {burned: true, burned_tx: token?.burned_tx} })
      } 
    } else {
      data = await fetcher(`account/${tAddr}`)
      console.log(data)
    }
  
    if(data){

      const tx = await txFetcher(`account/transactions?account=${tAddr}&limit=1`)
      console.log(tx)

      try {
          const update = {
            $set: {
              burned: true,
              burned_tx: tx
            }
          }
    
          const result = await tokens.updateOne(filter, update)
    
          return NextResponse.json({ success: true, result: {burned: data, burned_tx: tx} })
          
        } catch (error) {
          console.log(error);
          return NextResponse.json({ success: false, step: "catch_error", error: error });
        }
  } else {
    return NextResponse.json({ success: false, error, step: "else", data, result: {burned: false, burned_tx: ""} });
  }

  } catch(e) {
    error = e
    console.log(e)
    console.log(process.env.SOLSCAN_TOKEN)
    return NextResponse.json({ success: false, error:e, step: "catch_e", result: {burned: false, burned_tx: ""} });
  }

  return NextResponse.json({ success: false, error, step: "last", result: {burned: false, burned_tx: ""} });

}
