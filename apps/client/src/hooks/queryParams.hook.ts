import { useLocation } from "react-router-dom"

export const useSearchQueries = () => {
  const location = useLocation()

  if (location.search === "") return null

  const entries = location.search.replace("?", "").split("&")

  const queries: Record<string, string> = {}

  for (const query of entries) {
    const [key, value] = query.split("=")

    queries[key] = value
  }

  return queries
}
