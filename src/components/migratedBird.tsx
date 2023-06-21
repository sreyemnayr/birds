import * as React from 'react'

import { Bird } from '@/providers/birdsOfSolisProvider'

interface IMigratedBird {
  bird: Bird
}

export const MigratedBird = ({bird}: IMigratedBird) => {

  return(
    
      <div className="card relative flex flex-col shrink align-center justify-center justify-items-center content-center items-center pb-8">
        {/*<div className="absolute inline-flex items-center justify-center p-2 text-xs font-bold text-white bg-slate-500 border-2 border-white rounded-lg -top-2 -right-2 dark:border-gray-900">{bird.token_id}</div> */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="object-contain object-center h-[100px] max-w-[200px] hover:rounded" src={bird.thumbnail} alt="Birds of Solis" />
            {/* <div className="text-xl">{bird.name}</div> */}
            {/* <a 
              className="absolute inline-flex items-center justify-center p-2 text-xs font-bold text-white bg-blue-400 hover:bg-cyan-400 border-2 border-white rounded-lg -bottom-2 -right-2 dark:border-gray-900"
              href={`https://opensea.io/assets/ethereum/0x48d8a13b3e499c98db1566ea41aee212642ea182/${bird.token_id}`}
              target="_blank"
              >os</a>
              <a 
              className="absolute inline-flex items-center justify-center p-2 text-xs font-bold text-white bg-sky-700 hover:bg-cyan-400 border-2 border-white rounded-lg -bottom-2 -left-2 dark:border-gray-900"
              href={`https://etherscan.io/tx/${bird.mint_tx}`}
              target="_blank"
              >tx</a> */}
              <div className="text-lg shrink max-w-[100px]">{bird.name}</div>
              <div className="inline-flex">
                <a 
                className="inline-flex items-center justify-center p-2 text-sm font-bold text-white bg-blue-400 hover:bg-cyan-400 border-2 border-white rounded-lg dark:border-gray-900"
                href={`https://opensea.io/assets/ethereum/0x48d8a13b3e499c98db1566ea41aee212642ea182/${bird.token_id}`}
                target="_blank"
                >OpenSea</a>
                <a 
                className="inline-flex items-center justify-center p-2 text-sm font-bold text-white bg-sky-700 hover:bg-cyan-400 border-2 border-white rounded-lg dark:border-gray-900"
                href={`https://etherscan.io/tx/${bird.mint_tx}`}
                target="_blank"
                >Etherscan</a>
              </div>
              
      
            
      </div>
    
  )
}