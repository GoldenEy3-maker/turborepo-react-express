import { cls } from "@/utils/helpers"
import { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./modal.module.scss"

export const Actions: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div className={cls([className, styles.actions])} {...props}>
      {children}
    </div>
  )
}
