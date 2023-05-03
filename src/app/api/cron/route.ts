import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongoClient"


const url = process.env.MONGODB_URL || ""

export async function GET() {

    try {
        const client = await clientPromise
        
          const db = client.db("birds")
          const tokens = db.collection("tokens")
    
          
          const result = await tokens.find({minted:true}).sort({mint_block:-1}).limit(1).toArray()
          const mint_block = result[0].mint_block
          
          const res = await fetch(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=0x8455c49C92c814DD293c6bE2888298E88B274007&page=0&offset=1000&startblock=${mint_block + 1}&sort=asc&apikey=M6A46XPIMK6R69D9C2M8PTAAMZ2KKDSAD7`, {next: { revalidate: 5 },}).then(r=>r.json())
          
          console.log(res)

          if(res){
            for(let tx of res.result){
                await tokens.updateOne({token_id: parseInt(tx.tokenID)}, {$set: {minted: true, mint_tx: tx.hash, mint_block: parseInt(tx.blockNumber)}})
            }
          }

          return NextResponse.json({success: true})
    
          
        } catch (error) {
          console.log(error);
        }

    


}