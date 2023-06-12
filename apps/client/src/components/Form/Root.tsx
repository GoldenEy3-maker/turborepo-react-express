import { cls } from "@/utils/helpers"
import { DetailedHTMLProps, FC, FormHTMLAttributes } from "react"
import styles from "./form.module.scss"

export const Root: FC<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
> = ({ children, className, ...props }) => {
  return (
    <form className={cls([className, styles.root])} {...props}>
      {children}
    </form>
  )
}
