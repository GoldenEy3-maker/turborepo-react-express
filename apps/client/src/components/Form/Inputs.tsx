import { cls } from "@/utils/helpers"
import { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./form.module.scss"

export const Inputs: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div className={cls([className, styles.inputs])} {...props}>
      {children}
    </div>
  )
}
