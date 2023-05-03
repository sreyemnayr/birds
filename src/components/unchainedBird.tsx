import * as React from 'react'
import {useState, useEffect} from 'react'

import { contract } from '@/data/contract'

import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'


import { Bird } from '@/providers/birdsOfSolisProvider'

interface IUnchainedBird {
  bird: Bird
}

const fetcher = async (tokenId: number) => fetch(`/api/mint/${tokenId}`).then((r)=>r.json())

export const UnchainedBird = ({bird}: IUnchainedBird) => {

  const { address, isConnecting } = useAccount()

  const [ status, SetStatus ] = useState('')

  const [ hasSignature, setHasSignature ] = useState(false)

  const [ mintSignature, setMintSignature ] = useState('')
  const [ mintWallet, setMintWallet ] = useState('' as `0x${string}`)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    ...contract,
    functionName: 'freeBird',
    args: [mintWallet, bird.token_id, mintSignature],
    enabled: hasSignature && mintSignature !== '' && mintWallet !== '0x'
  })
  const { data, error, isError, write } = useContractWrite(config)

  useEffect(()=>{
    fetcher(bird.token_id).then(res=>{
      if(!res.success){
        throw Error("No valid mint key")
      }
      const {signature, wallet} = res.result

      setMintSignature(signature)
      setMintWallet(wallet)
      setHasSignature(true)
    })
       
  }, [bird.token_id])


  return(
    
      <div className="card relative flex flex-col w-48 align-center justify-center justify-items-center content-center items-center">
        {/*<div className="absolute inline-flex items-center justify-center p-2 text-xs font-bold text-white bg-slate-500 border-2 border-white rounded-lg -top-2 -right-2 dark:border-gray-900">{bird.token_id}</div> */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="object-cover object-center h-[100px] w-[100px] rounded-full hover:rounded hover:object-contain" src={bird.thumbnail} alt="Birds of Solis" />
            <div className="text-xs">{bird.name}</div>
            <button 
              className="absolute inline-flex items-center justify-center p-2 text-xs font-bold text-white bg-emerald-500 hover:bg-lime-500 border-2 border-white rounded-lg -bottom-2 -right-2 dark:border-gray-900"
              onClick={()=>{
                write?.()}
              } 
              >{ hasSignature ? "MIGRATE" : "PREPARING" } #{bird.token_id}</button>
      </div>
    
  )
}