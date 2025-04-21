"use client"

import useSWR from "swr"

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    error.message = await res.text()
    throw error
  }

  return res.json()
}

export function useApi(url: string | null) {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    data,
    loading: isLoading,
    error,
    refetch: mutate,
  }
}
