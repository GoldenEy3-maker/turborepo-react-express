import { cls } from "@/utils/helpers"
import type { FlowComponent, JSX } from "solid-js"
import styles from "./modal.module.scss"

export const Actions: FlowComponent<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div {...props} class={cls([props.class, styles.actions])}>
      {props.children}
    </div>
  )
}
