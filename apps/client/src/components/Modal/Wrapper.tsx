import { cls } from "@/utils/helpers"
import { type FlowComponent, type JSX } from "solid-js"
import styles from "./modal.module.scss"

export const Wrapper: FlowComponent<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div
      {...props}
      data-modal-prevent
      class={cls([props.class, styles.wrapper])}
    >
      {props.children}
    </div>
  )
}
