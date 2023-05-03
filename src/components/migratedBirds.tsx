'use client'

import { useBirdsOfSolis } from '@/providers/birdsOfSolisProvider';

import { MigratedBird } from './migratedBird';


export default function MigratedBirds() {

  const { ethereumBirds } = useBirdsOfSolis()

  return (
    <>
      <h3>{ethereumBirds.length} Migrated Birds:</h3>

      <div className='flex flex-wrap'>
        {
          ethereumBirds?.map((sb) => (
            <div key={`div${sb._id}`} >
              <MigratedBird key={`bird_${sb._id}`} bird={sb} />
            </div>
          ))
        }
      </div>
    </>
  )
}