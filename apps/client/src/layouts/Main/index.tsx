import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { useAuthProtect } from "@/hooks/authProtect"
import { cls } from "@/utils/helpers"
import type { FC } from "react"
import { Outlet } from "react-router-dom"
import styles from "./mainLayout.module.scss"

const MainLayout: FC = () => {
  useAuthProtect()

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
