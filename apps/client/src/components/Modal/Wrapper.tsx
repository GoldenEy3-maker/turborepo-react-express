import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./styles.module.scss"

export const Wrapper: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div
      data-modal-prevent
      className={cls([className, styles.wrapper])}
      {...props}
    >
      {children}
    </div>
  )
}
