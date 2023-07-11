import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./styles.module.scss"

type HeaderProps = {
  spaceBetween?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

export const Header: FC<HeaderProps> = ({
  spaceBetween,
  className,
  children,
  ...props
}) => {
  return (
    <header
      className={cls([className, styles.header], {
        [styles._spaceBetween]: !!spaceBetween,
      })}
      {...props}
    >
      {children}
    </header>
  )
}
