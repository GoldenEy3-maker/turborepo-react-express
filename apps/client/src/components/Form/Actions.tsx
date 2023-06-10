import { cls } from "@/utils/helpers"
import { splitProps, type FlowComponent, type JSX } from "solid-js"
import styles from "./form.module.scss"

type ActionsProps = {
  flexEnd?: boolean
} & JSX.HTMLAttributes<HTMLDivElement>

export const Actions: FlowComponent<ActionsProps> = (props) => {
  const [splitedProps, restProps] = splitProps(props, ["flexEnd"])

  return (
    <div
      {...restProps}
      class={cls([restProps.class, styles.actions], {
        [styles._flexEnd]: !!splitedProps.flexEnd,
      })}
    >
      {restProps.children}
    </div>
  )
}
