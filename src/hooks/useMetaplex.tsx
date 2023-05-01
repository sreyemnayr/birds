'use client'
import { useState, useEffect, useMemo } from "react";
import { Metaplex, keypairIdentity, FindNftsByOwnerOutput } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export function useMetaplex() {
  const { connection } = useConnection()
  const { publicKey, wallet } = useWallet()

  const mx = Metaplex.make(connection)

  const [nfts, setNfts] = useState<FindNftsByOwnerOutput>()

  useEffect(()=>{
    async function fetchNft(pk: PublicKey){
      const asset = await mx.nfts().findAllByOwner({ owner: pk })
      return asset
    }
    if(publicKey && !nfts){
      fetchNft(publicKey).then((t)=>{setNfts(t)})
    }
  }, [publicKey, mx, nfts])

  return useMemo( ()=>{
    return {nfts}
  }, [nfts])

  // return {nfts}

}