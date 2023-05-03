'use client'

import { Web3Button } from '@web3modal/react'

import { useSwitchNetwork } from 'wagmi'

export default function EthereumConnect() {

  const network = useSwitchNetwork({
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "1")
  })

  return (
    <>
      <Web3Button />
    </>
  )
}
