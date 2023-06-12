import { trpc } from "@/utils/trpc"
import type { FC } from "react"

const HomePage: FC = () => {
  const { data, isFetching, isLoading, error } = trpc.test.useQuery()

  return (
    <main className="home">
      {isLoading || isFetching ? "Loading..." : error ? error.message : data}
    </main>
  )
}

export default HomePage
