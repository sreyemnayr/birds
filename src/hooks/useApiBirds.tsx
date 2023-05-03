'use client'

import useSWR from 'swr'

const fetcher = (key: string) => fetch(key, {
  "headers": {
    "accept": "*/*",
  },
  "method": "GET",
  next: {revalidate: 5},
}).then(res => res.json());

export function useApiBirds(sAddress: string | undefined) {
  
  const { data, error, isLoading, mutate } = useSWR(sAddress ? `/api/birds/${sAddress}` : null, fetcher)
  if(data?.result){
    console.log("in if data result")
    console.log(data.result)
    return {
      data: data.result,
      isLoading,
      isError: error,
      mutate
    }
  } else {
    return {
      data: undefined,
      isLoading,
      isError: error,
      mutate
    }
  }
  
}