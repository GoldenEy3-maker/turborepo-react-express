import Resume from "./components/Resume"
import ProfileSidebar from "./components/Sidebar"
import Stats from "./components/Stats"
import styles from "./profile.module.scss"

const ProfilePage: React.FC = () => {
  return (
    <main className={styles.profile}>
      <ProfileSidebar />
      <div className={styles.wrapper}>
        <Stats />
        <Resume />
      </div>
    </main>
  )
}

export default ProfilePage
