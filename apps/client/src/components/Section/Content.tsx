import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./section.module.scss"

export const Content: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div className={cls([className, styles.content])} {...props}>
      {children}
    </div>
  )
}
