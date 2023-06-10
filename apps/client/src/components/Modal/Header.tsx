import { cls } from "@/utils/helpers"
import { splitProps, type FlowComponent, type JSX } from "solid-js"
import styles from "./modal.module.scss"

type HeaderProps = {
  spaceBetween?: boolean
} & JSX.HTMLAttributes<HTMLElement>

export const Header: FlowComponent<HeaderProps> = (props) => {
  const [splitedProps, restProps] = splitProps(props, ["spaceBetween"])

  return (
    <header
      {...restProps}
      class={cls([restProps.class, styles.header], {
        [styles._spaceBetween]: !!splitedProps.spaceBetween,
      })}
    >
      {restProps.children}
    </header>
  )
}
