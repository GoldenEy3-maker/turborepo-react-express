import { cls } from "@/utils/helpers.ts"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./table.module.scss"

export const Head: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div className={cls([className, styles.head])} {...props}>
      {children}
    </div>
  )
}
