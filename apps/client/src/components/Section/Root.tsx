import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./styles.module.scss"

export const Root: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ className, children, ...props }) => {
  return (
    <section className={cls([className, styles.root])} {...props}>
      {children}
    </section>
  )
}
