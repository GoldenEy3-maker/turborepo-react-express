import { useAuthStore } from "@/store/auth"
import type { FC } from "react"
import styles from "./styles.module.scss"

const Header: FC = () => {
  const user = useAuthStore((state) => state.user)

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
        {getGreetings()}, <span className="rich-text">{user?.firstName}</span>!
      </h1>
    </header>
  )
}

export default Header
