import { trpc } from "@/utils/trpc"
import { QueryClient } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { useState } from "react"
import SuperJSON from "superjson"

export const useTrpcClient = () => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api",
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            })
          },
        }),
      ],
      transformer: SuperJSON,
    })
  )

  return { trpcClient, queryClient }
}