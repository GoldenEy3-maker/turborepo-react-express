import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { useAuthStore } from "@/store/auth"
import { cls } from "@/utils/helpers"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { trpc } from "../../utils/trpc"
import styles from "./styles.module.scss"

const MainLayout: React.FC = () => {
  const currentUserQuery = trpc.user.getCurrent.useQuery()

  useEffect(() => {
    useAuthStore.setState({ user: currentUserQuery.data })
  }, [currentUserQuery.data])

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
