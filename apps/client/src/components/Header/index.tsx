import type { Component } from "solid-js"
import { getCookieObject } from "utils"
import { CookieKeys } from "utils/enums"
import type { AuthCookie } from "utils/types"
import styles from "./header.module.scss"

const Header: Component = () => {
  const authCookie = getCookieObject<AuthCookie>(CookieKeys.AuthToken)

  return (
    <header class={styles.header}>
      <h1 class="page-title">
        Доброе утро, <span class="rich-text">{authCookie?.firstName}</span>
      </h1>
    </header>
  )
}

export default Header
