import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { setStaticClass } from "@/utils/helpers"
import { Outlet } from "@solidjs/router"
import type { Component } from "solid-js"
import styles from "./mainLayout.module.scss"

const MainLayout: Component = () => {
  return (
    <>
      <Sidebar />
      <div class={setStaticClass(styles.layout, "_container")}>
        <Header />
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout
