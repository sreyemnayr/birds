'use client'

import { useState } from 'react'
import { useBirdsOfSolis } from '@/providers/birdsOfSolisProvider';
import { Bird } from '@/providers/birdsOfSolisProvider';

import { useAccount } from 'wagmi'

import { PublicKey } from '@solana/web3.js';

import { SolanaBird } from './solanaBird';
import { UnchainedBird } from './unchainedBird';


export default function UnchainedBirds() {

  const [ status, SetStatus ] = useState('')

  const { unchainedBirds } = useBirdsOfSolis()

  const { address, isConnecting } = useAccount()

  const mintNFT = async (nft: string) => {
    if(address){
      try {
        console.log("MINT NFT")
        
      } catch (e) {
        if (e instanceof Error) {
          SetStatus('ERROR');
          console.log(e)
          
        }
      }

    }
    
  };

  
  return (
    <>
      <h3>{unchainedBirds.length} Unchained Birds:</h3>
        
        <div className='flex flex-wrap'>
         {
          
          unchainedBirds?.map((sb) => (
            <div key={`div${sb._id}`} >
            <UnchainedBird key={`bird_${sb._id}`} bird={sb} mint={async ()=>{await mintNFT(`${sb.token_id}`)}}/>
            </div>
          ))
        }
        </div>
    </>
  )
}