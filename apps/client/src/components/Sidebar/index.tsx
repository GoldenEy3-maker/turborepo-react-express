import { useModal } from "@/hooks/modal"
import { useRippleEffect } from "@/hooks/rippleEffect"
import SignOutModal from "@/modals/SignOut"
import { useSignOutModalStore } from "@/modals/SignOut/store"
import { RouterPaths } from "@/utils/enums"
import type { FC } from "react"
import { Link } from "react-router-dom"
import { getCookieObject } from "utils"
import { CookieKeys } from "utils/enums"
import type { AuthCookie } from "utils/types"
import Button from "../Button"
import Logo from "../Logo"
import styles from "./sidebar.module.scss"

const Sidebar: FC = () => {
  const rippleEffectEvent = useRippleEffect()
  const [openModal] = useModal()

  const authCookie = getCookieObject<AuthCookie>(CookieKeys.AuthToken)

  const profileImage = authCookie?.photo

  return (
    <>
      <SignOutModal />
      <aside className={styles.sidebar}>
        <Logo />
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link
                to={RouterPaths.HomePage}
                title="Главная"
                onPointerDown={rippleEffectEvent}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 -960 960 960"
                    width="28"
                  >
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                  </svg>
                </span>
                <span>Главная</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="#" title="Заказы" onPointerDown={rippleEffectEvent}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 -960 960 960"
                    width="28"
                  >
                    <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
                  </svg>
                </span>
                <span>Заказы</span>
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link
                to={RouterPaths.ProfilePage}
                title="Профиль"
                onPointerDown={rippleEffectEvent}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 -960 960 960"
                    width="28"
                  >
                    <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" />
                  </svg>
                </span>
                <span>Профиль</span>
              </Link>
            </li>
            <hr className={styles.navDivider} />
            <li className={styles.navItem}>
              <Link to="#" title="Резюме" onPointerDown={rippleEffectEvent}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M320-280q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 320h240v-80H440v80Zm0-160h240v-80H440v80Zm0-160h240v-80H440v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                  </svg>
                </span>
                <span>Резюме</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="#"
                title="Ваши заказы"
                onPointerDown={rippleEffectEvent}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z" />
                  </svg>
                </span>
                <span>Ваши заказы</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.profile}>
          <div className={styles.profileWrapper}>
            <div className={styles.profileImg}>
              <img
                src={`/images/${profileImage ?? "avatar-placeholder.png"}`}
                alt=""
              />
            </div>
            <span className={styles.profileName}>{authCookie?.firstName}</span>
          </div>

          <Button
            isIcon
            onClick={() =>
              openModal(() => useSignOutModalStore.setState({ state: true }))
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28"
              viewBox="0 -960 960 960"
              width="28"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </Button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
