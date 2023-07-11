import { useAuthStore } from "@/store/auth"
import { trpc } from "@/utils/trpc"
import { QueryClient } from "@tanstack/react-query"
import { httpBatchLink, loggerLink } from "@trpc/client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SuperJSON from "superjson"
import { RouterPaths } from "../utils/enums"

export const useTrpcClient = () => {
  const navigate = useNavigate()

  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === "development" &&
              typeof window !== "undefined") ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: "/api",
          async fetch(url, options) {
            const response = await fetch(url, {
              ...options,
              credentials: "include",
            })

            if (response.status === 401) {
              const refreshResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/refresh_token`,
                {
                  method: "POST",
                  credentials: "include",
                }
              )

              if (!refreshResponse.ok) {
                navigate(RouterPaths.SignInPage)
                return response
              }

              const refreshData: { accessToken: string } =
                await refreshResponse.json()

              useAuthStore.setState({ token: refreshData.accessToken })

              return await fetch(url, {
                ...options,
                credentials: "include",
                headers: {
                  ...options?.headers,
                  authorization: `Bearer ${refreshData.accessToken}`,
                },
              })
            }

            return response
          },
          async headers() {
            return {
              authorization: `Bearer ${useAuthStore.getState().token}`,
            }
          },
        }),
      ],
      transformer: SuperJSON,
    })
  )

  return { trpcClient, queryClient }
}
