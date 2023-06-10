import { Outlet } from "@solidjs/router"
import type { Component } from "solid-js"
import styles from "./authLayout.module.scss"

const AuthLayout: Component = () => {
  return (
    <div class="_container">
      <main class={styles.page}>
        <div class={styles.wrapper}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AuthLayout