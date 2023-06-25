import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./styles.module.scss"

type HeaderProps = {
  isCenter?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

export const Header: FC<HeaderProps> = ({
  className,
  children,
  isCenter,
  ...props
}) => {
  return (
    <header
      className={cls([className, styles.header], {
        [styles._center]: !!isCenter,
      })}
      {...props}
    >
      {children}
    </header>
  )
}
