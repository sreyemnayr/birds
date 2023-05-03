'use client'

import { useState } from 'react'
import { useBirdsOfSolis } from '@/providers/birdsOfSolisProvider';
import { Bird } from '@/providers/birdsOfSolisProvider';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';

import { PublicKey } from '@solana/web3.js';

import { SolanaBird } from './solanaBird';


export default function SolanaBirds() {

  const { solanaBirds } = useBirdsOfSolis()

  
  return (
    <>
      <h3>{solanaBirds.length} Birds on Solana{solanaBirds.length > 0 ? ":" : ""}</h3>
        {solanaBirds.length > 0 && (
        <div className='flex flex-wrap'>
         {
          
          solanaBirds?.map((sb) => (
            <div key={`div${sb._id}`} >
            <SolanaBird key={`bird_${sb._id}`} bird={sb}/>
            </div>
          ))
        }
        </div>
        )}
    </>
  )
}