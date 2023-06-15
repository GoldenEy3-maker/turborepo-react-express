import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, FormHTMLAttributes } from "react"
import styles from "./form.module.scss"

type RootProps = {
  withGroups?: boolean
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export const Root: FC<RootProps> = ({
  children,
  className,
  withGroups,
  ...props
}) => {
  return (
    <form
      className={cls([className, styles.root], {
        [styles.withGroups]: !!withGroups,
      })}
      {...props}
    >
      {children}
    </form>
  )
}
