import { cls } from "@/utils/helpers"
import { type FlowComponent, type JSX } from "solid-js"
import styles from "./form.module.scss"

export const Root: FlowComponent<JSX.FormHTMLAttributes<HTMLFormElement>> = (
  props
) => {
  return (
    <form {...props} class={cls([props.class, styles.root])}>
      {props.children}
    </form>
  )
}
