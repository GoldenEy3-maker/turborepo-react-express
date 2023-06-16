import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./form.module.scss"

export type ResponseMessageType = "danger" | "warning" | "success" | undefined

type ResponseProps = {
  state: boolean
  type: ResponseMessageType
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Response: FC<ResponseProps> = ({
  className,
  children,
  state,
  type,
  ...props
}) => {
  return (
    <div
      className={cls([className, styles.response], {
        [styles._dangerMessage]: type === "danger",
        [styles._successMessage]: type === "success",
        [styles._warningMessage]: type === "warning",
      })}
      aria-hidden={!state}
      {...props}
    >
      <div className={styles.responseMessage}>{children}</div>
    </div>
  )
}
