import { cls } from "@/utils/helpers"
import type { FlowComponent, JSX } from "solid-js"
import styles from "./modal.module.scss"

export const Title: FlowComponent<JSX.HTMLAttributes<HTMLHeadingElement>> = (
  props
) => {
  return (
    <h3 {...props} class={cls([props.class, styles.title])}>
      {props.children}
    </h3>
  )
}
