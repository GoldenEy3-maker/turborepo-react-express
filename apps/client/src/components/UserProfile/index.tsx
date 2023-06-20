import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { getCookieObject } from "utils"
import { CookieKeys } from "utils/enums"
import type { AuthCookie } from "utils/types"
import { cls } from "@/utils/helpers.ts"
import styles from "./userProfile.module.scss"

type UserProfileProps = {
  image?: string
  name?: string
  isExtraSizeName?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const UserProfile: FC<UserProfileProps> = ({ image, name, isExtraSizeName, className, ...props }) => {
  const authCookie = getCookieObject<AuthCookie>(CookieKeys.AuthToken)

  return (
    <div className={cls([className, styles.userProfile], {
      [styles._extraSizeName]: !!isExtraSizeName
    })} {...props}>
      <div className={styles.img}>
        <img src={`/images/${image ?? authCookie?.photo ?? "avatar-placeholder.png"}`} alt="Фото профиля" />
      </div>
      <span>{name ?? authCookie?.firstName}</span>
    </div>
  )
}
export default UserProfile
