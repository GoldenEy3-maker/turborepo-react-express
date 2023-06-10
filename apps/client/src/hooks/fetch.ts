import { createSignal } from "solid-js"

export const useFetch = () => {
  const [isLoading, setIsLoading] = createSignal(false)
  const [errors, setErrors] = createSignal<string | null>(null)

  const request = async <T extends object>(url: RequestInfo | URL, options?: RequestInit) => {
    setIsLoading(true)
    setErrors(null)

    try {
      const res = await fetch(url, options)
      const data = await res.json() as T

      if ("error" in data) {
        throw new Error((data.error as Error).message)
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        setErrors(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, errors, request }
}