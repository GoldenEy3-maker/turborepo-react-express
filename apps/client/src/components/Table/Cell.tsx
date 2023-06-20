import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { cls } from "@/utils/helpers.ts"
import styles from './table.module.scss'

export const Cell: FC< DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({className, children, ...props}) => {
  return (
    <div className={cls([className, styles.cell])} {...props}>{children}</div>
  )
}
