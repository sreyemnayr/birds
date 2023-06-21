'use client'

import { useBirdsOfSolis } from '@/providers/birdsOfSolisProvider';

import { MigratedBird } from './migratedBird';


export default function MigratedBirds() {

  const { ethereumBirds } = useBirdsOfSolis()

  return (
    <>
      <h1>{ethereumBirds.length} Migrated Bird{ethereumBirds.length > 1 ? 's' : ''}:</h1>

      <div className='flex flex-wrap justify-center'>
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