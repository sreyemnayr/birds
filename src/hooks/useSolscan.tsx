'use client'

import useSWR from 'swr'

const fetcher = (tAddress: string) => fetch(`https://public-api.solscan.io/account/${tAddress}`, {
  "headers": {
    "accept": "*/*",
    "token": process.env.SOLSCAN_TOKEN || "",
  },
  "method": "GET",
}).then(res => res.json());

export function useSolscan(tAddress: string) {
  const { data, error, isLoading } = useSWR(tAddress, fetcher)
  return {
    data,
    isLoading,
    isError: error
  }
}