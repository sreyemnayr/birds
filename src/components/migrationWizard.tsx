'use client'

import React, { PropsWithChildren, useState, Suspense, useEffect } from 'react'

import useSWR from 'swr'

import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import { Web3Button } from '@web3modal/react'

import { useWallet } from '@solana/wallet-adapter-react';

import { useAccount } from 'wagmi'

import { sign } from 'tweetnacl';
import { encode } from 'bs58';

import SolanaBirds from './solanaBirds';
import UnchainedBirds from './unchainedBirds';

interface linkBody {
  sAddress: string;
  eAddress: string;
  signature: string;
};

const fetcher = (body: linkBody) => fetch(`/api/link`, {
  "headers": {
    "Content-Type": "application/json",
    "accept": "*/*",
  },
  "body": JSON.stringify(body),
  "method": "POST",
}).then(res => res.json());

const linkFetcher = (key: string) => fetch(key).then(res => res.json());


export function MigrationWizard({ children }: PropsWithChildren) {
  const [step, setStep] = useState(0)

  const { publicKey, signMessage } = useWallet()

  const [ messageVerified, setMessageVerified ] = useState(false)

  const { data: linkData, error, isLoading } = useSWR(publicKey ? `/api/link/${publicKey.toString()}` : null, linkFetcher)

  const { address: eAddress, isConnecting: eIsConnecting } = useAccount()

  useEffect(()=>{
    console.log(linkData)
    if(linkData?.result?.eAddress) {
      setMessageVerified(true)
    }
  }, [linkData])

  const currentStepLi = "flex items-center text-blue-600 dark:text-blue-500 space-x-2.5"
  const completedStepLi = "flex items-center text-green-600 dark:text-green-500 space-x-2.5"
  const futureStepLi = "flex items-center text-gray-500 dark:text-gray-400 space-x-2.5"

  const currentStepSpan = "flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500"
  const completedStepSpan = "flex items-center justify-center w-8 h-8 border border-green-600 rounded-full shrink-0 dark:border-green-500"
  const futureStepSpan = "flex items-center justify-center w-8 h-8 border border-gray-600 rounded-full shrink-0 dark:border-gray-500"

  return (
    <>
      <ol className="items-center justify-around w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
          <li className={step == 1 ? currentStepLi : step > 1 ? completedStepLi : futureStepLi} onClick={()=>{setStep(1)}}>
              <span className={step == 1 ? currentStepSpan : step > 1 ? completedStepSpan : futureStepSpan}>
                  <Suspense fallback={1}>{ publicKey ? '✓' : 1 }</Suspense>
              </span>
              <span>
                  <h3 className="font-medium leading-tight">Solana</h3>
                  <p className="text-sm">Connect Solana Wallet</p>
              </span>
          </li>
          <li className={step == 2 ? currentStepLi : step > 2 ? completedStepLi : futureStepLi} onClick={()=>{setStep(2)}}>
            <span className={step == 2 ? currentStepSpan : step > 2 ? completedStepSpan : futureStepSpan}>
            <Suspense fallback={2}>{ eAddress ? '✓' : 2 }</Suspense>
              </span>
              <span>
                  <h3 className="font-medium leading-tight">Ethereum</h3>
                  <p className="text-sm">Connect Ethereum Wallet</p>
              </span>
          </li>
          <li className={step == 3 ? currentStepLi : step > 3 ? completedStepLi : futureStepLi} onClick={()=>{setStep(3)}}>
            <span className={step == 3 ? currentStepSpan : step > 3 ? completedStepSpan : futureStepSpan}>
            <Suspense fallback={3}>{ messageVerified ? '✓' : 3 }</Suspense>
              </span>
              <span>
                  <h3 className="font-medium leading-tight">Verify</h3>
                  <p className="text-sm">Provide a signature</p>
              </span>
          </li>
          <li className={step == 4 ? currentStepLi : step > 4 ? completedStepLi : futureStepLi} onClick={()=>{setStep(4)}}>
            <span className={step == 4 ? currentStepSpan : step > 4 ? completedStepSpan : futureStepSpan}>
                  4
              </span>
              <span>
                  <h3 className="font-medium leading-tight">Migrate</h3>
                  <p className="text-sm">Burn and Mint</p>
              </span>
          </li>
      </ol>
      <div>
      {
        step == 0 && (
          <div className="card">
            <h1>Birds of Solis Migration</h1>
            <div className="flex flex-col align-center justify-around">
              <div>In a few steps, your Birds of Solis will be migrated from the Solana blockchain to Ethereum.</div>
              <div>
                <ol>
                  <li><Suspense fallback={1}>{ publicKey ? '✓' : 1 }</Suspense>. First, you&apos;ll connect the Solana wallet which holds your Birds of Solis</li>
                  <li><Suspense fallback={2}>{ eAddress ? '✓' : 2 }</Suspense>. Next, you&apos;ll connect the Etherum network and verify that the connected wallet is the public address to which you want to migrate</li>
                  <li><Suspense fallback={3}>{ messageVerified ? '✓' : 3 }</Suspense>. You&apos;ll sign a message using your SOLANA key to validate the ETHEREUM address to which you are migrating</li>
                  <li>4. You&apos;ll migrate your birds by first burning the SOLANA tokens, then minting the ETHEREUM tokens.</li>
                </ol>
                <button 
                  onClick={()=>{
                    setStep(!publicKey ? 1 : !eAddress ? 2 : !messageVerified ? 3 : 4 )
                  }}
                  className="inline-block rounded-full bg-emerald-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]">Let&apos;s Flocking Go!</button>
              </div>
            </div>
          </div>
        )
      }
      {
        step == 1 && (
          <div className="card">
            <h1>Connect Your Solana Wallet</h1>
            <div className="flex align-center justify-around">
            <WalletMultiButton />
            </div>
          </div>
        )
      }
      {
        step == 2 && (
          <div className="card">
          <h1>Connect Your Ethereum Wallet</h1>
          <div className="flex align-center justify-around">
          <Web3Button />
          </div>
          </div>
        )
      }
       {
        step == 3 && (
          <div className="card">
          <h1>Verify Your Accounts</h1>
          { !messageVerified && (
            <div className="flex align-center justify-around">
            <button className="wallet-adapter-button-trigger wallet-adapter-button" onClick={async ()=>{
            const message = new TextEncoder().encode(`My ethereum address is ${eAddress}`);
            const signature = await signMessage?.(message as Uint8Array) as Uint8Array;
              if (!sign.detached.verify(message, signature, publicKey?.toBytes() as Uint8Array))
                  throw new Error('Message signature invalid!');
              else {
                console.log("Signature verified")
                fetcher({
                  sAddress: publicKey?.toString() || "", // new TextDecoder().decode(publicKey?.toBytes() as Uint8Array),
                  eAddress: eAddress as string,
                  signature: encode(signature), // new TextDecoder().decode(signature)

                }).then((v) => {
                  if(v?.success) {
                    setMessageVerified(true)
                  } else {
                    console.log("There was a problem.")
                    console.log(v)
                  }
                })
                
              }
          }}>Sign Message</button>
          </div>
          )}
          {
            messageVerified && (
              <div className="flex align-center justify-around">
                <div>Message verified: <pre>{`My ethereum address is ${eAddress}`}</pre></div>
                <button className="wallet-adapter-button-trigger wallet-adapter-button" onClick={()=>{
                setMessageVerified(false)
              }}>Reset</button>
              </div>
            )
          }
          
          </div>
        )
      }
      {
        step == 4 && (
          <div className="card">
          <h1>Migrate Your Birds</h1>
          <h3>(Burn on Solana &rarr; Mint on Ethereum)</h3>
          <div className="flex flex-col align-center justify-around">
          <div className="flex mt-6 card"><SolanaBirds /></div>
          <div className="flex mt-6 card"><UnchainedBirds /></div>
        </div>
          </div>
        )
      }
      </div>
    </>
  )

}