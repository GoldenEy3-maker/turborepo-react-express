import { QueryClient } from "@tanstack/solid-query"
import type { AppRouter } from 'server/src/router'
import { createTRPCSolid, httpBatchLink } from "solid-trpc"
import SuperJSON from "superjson"

export const trpc = createTRPCSolid<AppRouter>()

export const client = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include"
        })
      }
    }),
  ],
  transformer: SuperJSON
})

export const queryClient = new QueryClient()