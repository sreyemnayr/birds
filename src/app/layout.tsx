
import { ClientProviders } from '@/lib/clientProviders'

import { EB_Garamond } from 'next/font/google'

require('@solana/wallet-adapter-react-ui/styles.css')
require('./globals.css')

const garamond = EB_Garamond({subsets: ['latin']})

export const metadata = {
  title: 'Birds of Sōlis',
  description: 'Migrate Birds of Sōlis from Solana to Etherum',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${garamond.className} leading-loose`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
