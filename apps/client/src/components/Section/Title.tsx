import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./styles.module.scss"

type TitleProps = {
  primary?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export const Title: FC<TitleProps> = ({
  primary,
  className,
  children,
  ...props
}) => {
  return (
    <h3
      className={cls([className, styles.title], {
        [styles._primary]: !!primary,
      })}
      {...props}
    >
      {children}
    </h3>
  )
}
