import Image from 'next/image'
import { Inter } from 'next/font/google'

import { MigrationWizard } from '@/components/migrationWizard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  
  /* <main className="flex min-h-screen flex-row items-center justify-around p-24"> */
  return (
    
    <main className="w-screen h-screen">
      <MigrationWizard />
    </main>
  )
}
