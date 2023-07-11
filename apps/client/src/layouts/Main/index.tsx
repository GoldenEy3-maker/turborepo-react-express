import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { useAuthStore } from "@/store/auth"
import { cls } from "@/utils/helpers"
import type { FC } from "react"
import { Outlet } from "react-router-dom"
import { trpc } from "../../utils/trpc"
import styles from "./styles.module.scss"

const MainLayout: FC = () => {
  const currentUserQuery = trpc.user.getCurrentUser.useQuery()

  useAuthStore.setState({ user: currentUserQuery.data })

  return (
    <>
      <Sidebar />
      <div className={cls([styles.layout, "_container"])}>
        <Header />
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout
