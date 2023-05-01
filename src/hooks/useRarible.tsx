import useSWR from 'swr'

const fetcher = (key: string) => fetch("https://rarible.com/marketplace/search/v1/ownerships", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
  },
  "body": `{\"size\":1000,\"filter\":{\"verifiedOnly\":false,\"sort\":\"LATEST_CREATED\",\"collections\":[\"SOLANA-0x955b4df10a180f0fcf9ccdb370f012293558287e6abdfcf6aabba64dccbb2e5c\"],\"ownerAddresses\":[\"${key}\"],\"incoming\":true,\"hide\":false,\"nsfw\":true,\"lazy\":true,\"platforms\":[]}}`,
  "method": "POST",
}).then(res => res.json()).then((j)=>j.map((i: any)=>i?.id?.split(":")?.[0]?.split('SOLANA-')?.[1] || ""));

export function useRarible(sAddress: string) {
  const { data, error, isLoading } = useSWR(`SOLANA-${sAddress}`, fetcher)
  return {
    tokens: data,
    isLoading,
    isError: error
  }
}