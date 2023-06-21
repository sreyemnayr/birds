'use client'

import { useState } from 'react'
import { useBirdsOfSolis } from '@/providers/birdsOfSolisProvider';

import { UnchainedBird } from './unchainedBird';


export default function UnchainedBirds() {


  const { unchainedBirds } = useBirdsOfSolis()

  

  
  return (
    <>
      <h1>{unchainedBirds.length} Unchained Bird{unchainedBirds.length > 1 ? "s" : ""}{unchainedBirds.length > 0 ? ":" : ""}</h1>
      {unchainedBirds.length > 0 && (
        <div className='flex flex-wrap justify-center'>
         {
          
          unchainedBirds?.map((sb) => (
            <div key={`div${sb._id}`} >
            <UnchainedBird key={`bird_${sb._id}`} bird={sb} />
            </div>
          ))
        }
        </div>
      )}
    </>
  )
}