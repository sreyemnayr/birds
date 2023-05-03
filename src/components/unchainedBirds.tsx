'use client'

import { useState } from 'react'
import { useBirdsOfSolis } from '@/providers/birdsOfSolisProvider';

import { UnchainedBird } from './unchainedBird';


export default function UnchainedBirds() {


  const { unchainedBirds } = useBirdsOfSolis()

  

  
  return (
    <>
      <h3>{unchainedBirds.length} Unchained Birds:</h3>
        
        <div className='flex flex-wrap'>
         {
          
          unchainedBirds?.map((sb) => (
            <div key={`div${sb._id}`} >
            <UnchainedBird key={`bird_${sb._id}`} bird={sb} />
            </div>
          ))
        }
        </div>
    </>
  )
}