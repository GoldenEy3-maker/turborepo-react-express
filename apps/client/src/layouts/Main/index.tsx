import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { useAuthProtect } from "@/hooks/authProtect"
import { cls } from "@/utils/helpers"
import { Outlet } from "@solidjs/router"
import type { Component } from "solid-js"
import styles from "./mainLayout.module.scss"

const MainLayout: Component = () => {
  useAuthProtect()

  return (
    <>
      <Sidebar />
      <div class={cls([styles.layout, "_container"])}>
        <Header />
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout
