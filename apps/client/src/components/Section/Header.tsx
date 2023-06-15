import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./section.module.scss"

export const Header: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ className, children, ...props }) => {
  return (
    <header className={cls([className, styles.header])} {...props}>
      {children}
    </header>
  )
}
