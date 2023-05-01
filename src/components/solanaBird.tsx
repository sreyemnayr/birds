'use client'

import { useState } from 'react'
import { useBirdsOfSolis } from '@/providers/birdsOfSolisProvider';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';

import { PublicKey } from '@solana/web3.js';


import { Bird } from '@/providers/birdsOfSolisProvider'

interface ISolanaBird {
  bird: Bird,
}

export const SolanaBird = ({bird}: ISolanaBird) => {

  const [ status, SetStatus ] = useState('')

  const { mutateBirds } = useBirdsOfSolis()
  
  const wallet = useWallet()

  const { connection } = useConnection()

  const metaplex = new Metaplex(connection)

  const checkBurned = async(nft: string, watch = false) => {
    
    const res = await fetch(`/api/burned/${nft}`).then(r=>r.json())
    if (res?.result?.burned){
      SetStatus('BURNED')
      mutateBirds?.()
      return true
    } else {
      if(watch){
        while(!await checkBurned(nft)){
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      } else {
        return false
      }
    }
  }

  const burnNFT = async (nft: string) => {
    SetStatus('CHECKING')
    if(await checkBurned(nft)){
      SetStatus('ALREADY BURNED')
      return true;
    }
    if(wallet){
      try {
        SetStatus('BURNING');
        metaplex.use(walletAdapterIdentity(wallet));
        const tx = await metaplex
              .nfts()
              .delete({
                mintAddress: new PublicKey(nft),
              });
        
        console.log(tx);
        SetStatus('VALIDATING');
        await checkBurned(nft, true);
      } catch (e) {
        if (e instanceof Error) {
          SetStatus('ERROR');
          console.log(e)
          
        }
      }

    }
    
  };

  return(
    
      <div className="card relative flex flex-col w-48 align-center justify-center justify-items-center content-center items-center">
        {/*<div className="absolute inline-flex items-center justify-center p-2 text-xs font-bold text-white bg-slate-500 border-2 border-white rounded-lg -top-2 -right-2 dark:border-gray-900">{bird.token_id}</div> */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="object-cover object-center h-[100px] w-[100px] rounded-full hover:rounded hover:object-contain" src={bird.thumbnail} alt="Birds of Solis" />
            <div className="text-xs">{bird.name}</div>
            <button 
              className="absolute inline-flex items-center justify-center p-2 text-xs font-bold text-white bg-red-500 hover:bg-amber-500 border-2 border-white rounded-lg -bottom-2 -right-2 dark:border-gray-900"
              onClick={async ()=>{await burnNFT(bird.account)}} >
              {status === "" && 
                `BURN #${bird.token_id}`
              }
              { status !== "" && status }
            </button>
      </div>
    
  )
}