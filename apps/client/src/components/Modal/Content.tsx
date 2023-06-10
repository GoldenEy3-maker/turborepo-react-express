import { cls } from "@/utils/helpers"
import type { FlowComponent, JSX } from "solid-js"
import styles from "./modal.module.scss"

export const Content: FlowComponent<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div {...props} class={cls([props.class, styles.content])}>
      {props.children}
    </div>
  )
}
