import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./section.module.scss"

type ContentProps = {
  isCenter?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Content: FC<ContentProps> = ({
  className,
  children,
  isCenter,
  ...props
}) => {
  return (
    <div
      className={cls([className, styles.content], {
        [styles._center]: !!isCenter,
      })}
      {...props}
    >
      {children}
    </div>
  )
}
