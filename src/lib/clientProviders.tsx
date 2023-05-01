'use client';
import React, { PropsWithChildren, useMemo } from 'react'

/* Solana WalletConnect */
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

/* Ethereum WalletConnect */
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'

import { BirdsOfSolisProvider } from '@/providers/birdsOfSolisProvider';

const chains = [mainnet]
const projectId = 'b1ba5105e77cbb67cb588a7ed7c0bbff'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

export function ClientProviders({ children }: PropsWithChildren) {

  const network =  WalletAdapterNetwork.Mainnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = "https://multi-lively-road.solana-mainnet.discover.quiknode.pro/3e3bd300531c1ac2beb787aacf0a1fa1f3f4e874/"
  const wallets = useMemo(
    () => [ new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );


  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <WagmiConfig client={wagmiClient}>
              <BirdsOfSolisProvider>
                {children}
              </BirdsOfSolisProvider>
            </WagmiConfig>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}