'use client'

import { WithId, Document } from 'mongodb';

import React, { PropsWithChildren, useContext, useState, useEffect, useMemo } from 'react'

import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { useAccount, useContract, useSigner } from 'wagmi'

// import { useRarible } from '@/hooks/useRarible'

import { useApiBirds } from '@/hooks/useApiBirds'

import { useMetaplex } from '@/hooks/useMetaplex';

/*
interface Bird {
  tokenId: string;
  network: string;
  migrated: boolean;
}
*/

export interface Bird extends WithId<Document>{
  "token_id": number,
  "address": string,
  "account": string,
  "name": string,
  metadata?: {
    token_id: number,
    "Token Name": string,
    "Beak": string,
    "Celestial": string,
    "Companion": string,
    "Genus": string,
    "Head Piece": string,
    "Oceanic": string,
    "Planetae": string,
    "Shoes": string,
    "Sky": string,
    "Species": string
  },
  "owner": string,
  "burned": boolean,
  "burned_tx": string,
  "minted": boolean,
  "minted_tx": string,
  "thumbnail": string
}

interface BirdsOfSolisContextType {
  solanaBirds: Bird[];
  ethereumBirds: Bird[];
  unchainedBirds: Bird[];
  mutateBirds?: ()=>void;
}

const BirdsOfSolisContext = React.createContext<BirdsOfSolisContextType>({solanaBirds: [], ethereumBirds: [], unchainedBirds: [], mutateBirds: undefined})

export function BirdsOfSolisProvider({ children }: PropsWithChildren) {

  const { connection: sConnection } = useConnection()
  const { publicKey: sAddress } = useWallet()

  const { address: eAddress } = useAccount()

  const [solanaBirds, setSolanaBirds] = useState<Bird[]>([])
  const [unchainedBirds, setUnchainedBirds] = useState<Bird[]>([])
  const [ethereumBirds, setEthereumBirds] = useState<Bird[]>([])

  const { data: tokens, mutate: mutateBirds } = useApiBirds(sAddress?.toString())
  // const { tokens } = useRarible(sAddress?.toString() || '')
  // const {nfts: tokens} = useMetaplex()

  useEffect(()=>{
    console.log(`Solana connected: ${sAddress}`)
    
  }, [sAddress])

  useEffect(() => {
    if(tokens){
      console.log(tokens)
      setSolanaBirds(tokens?.filter((t:Bird)=>(!t.burned)))
      setEthereumBirds(tokens?.filter((t:Bird)=>(t.minted)))
      setUnchainedBirds(tokens?.filter((t:Bird)=>(t.burned && !t.minted)))
    }
  }, [tokens])

  useEffect(()=>{
    console.log(`Ethereum connected: ${eAddress}`)
  }, [eAddress])

  return (
    <BirdsOfSolisContext.Provider value={{ solanaBirds, ethereumBirds, unchainedBirds, mutateBirds }}>
      {children}
    </BirdsOfSolisContext.Provider>
  )
}

export const useBirdsOfSolis = () => {
  const { solanaBirds, ethereumBirds, unchainedBirds, mutateBirds } = useContext(BirdsOfSolisContext)
  return { solanaBirds, ethereumBirds, unchainedBirds, mutateBirds }
}