import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, FieldsetHTMLAttributes } from "react"
import styles from "./styles.module.scss"

type GroupProps = {
  legend?: string
} & DetailedHTMLProps<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  HTMLFieldSetElement
>

export const Group: FC<GroupProps> = ({
  legend,
  className,
  children,
  ...props
}) => {
  return (
    <fieldset className={cls([className, styles.group])} {...props}>
      {legend ? <legend>{legend}</legend> : null}
      {children}
    </fieldset>
  )
}
