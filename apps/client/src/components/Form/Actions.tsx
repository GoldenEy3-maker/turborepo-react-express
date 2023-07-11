import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./form.module.scss"

type ActionsProps = {
  flexEnd?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Actions: FC<ActionsProps> = ({
  className,
  children,
  flexEnd,
  ...props
}) => {
  return (
    <div
      className={cls([className, styles.actions], {
        [styles._flexEnd]: !!flexEnd,
      })}
      {...props}
    >
      {children}
    </div>
  )
}
