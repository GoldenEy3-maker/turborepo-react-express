import type { FC } from "react"
import { Outlet } from "react-router-dom"
import styles from "./styles.module.scss"

const AuthLayout: FC = () => {
  return (
    <div className="_container">
      <main className={styles.page}>
        <div className={styles.wrapper}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
