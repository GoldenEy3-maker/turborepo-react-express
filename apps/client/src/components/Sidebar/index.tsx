import type { Component } from "solid-js"
import Logo from "../Logo"
import styles from "./sidebar.module.scss"

const Sidebar: Component = () => {
  return (
    <aside class={styles.sidebar}>
      <Logo />
    </aside>
  )
}

export default Sidebar
