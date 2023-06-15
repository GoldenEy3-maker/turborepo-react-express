import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./form.module.scss"

export const Group: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div className={cls([className, styles.group])} {...props}>
      {children}
    </div>
  )
}
