import * as React from 'react'

import { Bird } from '@/providers/birdsOfSolisProvider'

interface IMigratedBird {
  bird: Bird
}

export const MigratedBird = ({bird}: IMigratedBird) => {

  return(
    
      <div className="card relative flex flex-col w-48 align-center justify-center justify-items-center content-center items-center pb-8">
        {/*<div className="absolute inline-flex items-center justify-center p-2 text-xs font-bold text-white bg-slate-500 border-2 border-white rounded-lg -top-2 -right-2 dark:border-gray-900">{bird.token_id}</div> */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="object-cover object-center h-[100px] w-[100px] rounded-full hover:rounded hover:object-contain" src={bird.thumbnail} alt="Birds of Solis" />
            <div className="text-xs">{bird.name}</div>
            <a 
              className="absolute inline-flex items-center justify-center p-2 text-xs font-bold text-white bg-blue-400 hover:bg-cyan-400 border-2 border-white rounded-lg -bottom-2 -right-2 dark:border-gray-900"
              href={`https://https://opensea.io/assets/ethereum/0x48d8a13b3e499c98db1566ea41aee212642ea182/${bird.token_id}`}
              target="_blank"
              >view on opensea</a>
              <a 
              className="absolute inline-flex items-center justify-center p-2 text-xs font-bold text-white bg-sky-700 hover:bg-cyan-400 border-2 border-white rounded-lg -bottom-2 -left-2 dark:border-gray-900"
              href={`https://etherscan.io/tx/${bird.mint_tx}`}
              target="_blank"
              >tx on etherscan</a>
      
            
      </div>
    
  )
}