'use client'

import useSWR from 'swr'

const fetcher = (key: string) => fetch(key, {
  "headers": {
    "accept": "*/*",
    "token": process.env.SOLSCAN_TOKEN || "",
  },
  "method": "GET",
}).then(res => res.json());

export function useSolscan(tAddress: string) {
  const { data, error, isLoading } = useSWR(`https://public-api.solscan.io/account/${tAddress}`, fetcher)
  return {
    data,
    isLoading,
    isError: error
  }
}