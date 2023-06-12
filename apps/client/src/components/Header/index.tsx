import { FC } from "react"
import { getCookieObject } from "utils"
import { CookieKeys } from "utils/enums"
import type { AuthCookie } from "utils/types"
import styles from "./header.module.scss"

const Header: FC = () => {
  const authCookie = getCookieObject<AuthCookie>(CookieKeys.AuthToken)

  const getGreetings = () => {
    const currentHour = new Date().getHours()

    if (currentHour >= 6 && currentHour < 12) {
      return "Доброе утро"
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Добрый день"
    } else if (currentHour >= 18) {
      return "Добрый вечер"
    }

    return "Доброй ночи"
  }

  return (
    <header className={styles.header}>
      <h1 className="page-title">
        {getGreetings()},{" "}
        <span className="rich-text">{authCookie?.firstName}</span>!
      </h1>
    </header>
  )
}

export default Header
