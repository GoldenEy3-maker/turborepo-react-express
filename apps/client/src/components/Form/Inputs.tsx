import { cls } from "@/utils/helpers"
import type { FlowComponent, JSX } from "solid-js"
import styles from "./form.module.scss"

export const Inputs: FlowComponent<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div {...props} class={cls([props.class, styles.inputs])}>
      {props.children}
    </div>
  )
}
