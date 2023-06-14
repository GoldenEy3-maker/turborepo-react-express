import type { FC } from "react"
import EditInfoForm from "./components/EditInfoForm"
import InfoSidebar from "./components/InfoSidebar"
import Stats from "./components/Stats"
import styles from "./profile.module.scss"

const ProfilePage: FC = () => {
  return (
    <main className={styles.profile}>
      <InfoSidebar />
      <div className={styles.wrapper}>
        <Stats />
        <EditInfoForm />
      </div>
    </main>
  )
}

export default ProfilePage
