'use client'

import useSWR from 'swr'

const fetcher = (sAddress: string) => fetch(`/api/birds/${sAddress}`, {
  "headers": {
    "accept": "*/*",
  },
  "method": "GET",
}).then(res => res.json());

export function useApiBirds(sAddress: string) {
  console.log("In useApiBirds")
  console.log(sAddress)
  
  const { data, error, isLoading, mutate } = useSWR(sAddress !== "" ? sAddress : null, fetcher)
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
      data: [],
      isLoading,
      isError: error,
      mutate
    }
  }
  
}