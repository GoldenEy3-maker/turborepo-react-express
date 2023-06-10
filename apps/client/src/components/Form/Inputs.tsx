import { setStaticClass } from "@/utils/helpers"
import type { FlowComponent, JSX } from "solid-js"
import styles from "./form.module.scss"

export const Inputs: FlowComponent<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div {...props} class={setStaticClass(props.class, styles.inputs)}>
      {props.children}
    </div>
  )
}
