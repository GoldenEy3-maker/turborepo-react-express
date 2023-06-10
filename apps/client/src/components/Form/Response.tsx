import { cls } from "@/utils/helpers"
import { splitProps, type FlowComponent, type JSX } from "solid-js"
import styles from "./form.module.scss"

export type ResponseMessageType = "danger" | "warning" | "success" | undefined

type ResponseProps = {
  state: boolean
  type: ResponseMessageType
} & JSX.HTMLAttributes<HTMLDivElement>

export const Response: FlowComponent<ResponseProps> = (props) => {
  const [splitedProps, restProps] = splitProps(props, ["state", "type"])

  return (
    <div
      {...restProps}
      aria-hidden={!splitedProps.state}
      class={cls([restProps.class, styles.response], {
        [styles._dangerMessage]: splitedProps.type === "danger",
        [styles._successMessage]: splitedProps.type === "success",
        [styles._warningMessage]: splitedProps.type === "warning",
      })}
    >
      <div class={styles.responseMessage}>{restProps.children}</div>
    </div>
  )
}
