import { cls } from "@/utils/helpers"
import { splitProps, type FlowComponent, type JSX } from "solid-js"
import styles from "./modal.module.scss"

type RootProps = {
  closeHandler?: () => void
} & JSX.HTMLAttributes<HTMLDivElement>

export const Root: FlowComponent<RootProps> = (props) => {
  const [splitedProps, restProps] = splitProps(props, ["closeHandler"])

  return (
    <div
      {...restProps}
      class={cls([restProps.class, styles.root])}
      onPointerDown={(e) => {
        if (
          !e.target.closest("[data-modal-prevent]") &&
          splitedProps.closeHandler
        )
          splitedProps.closeHandler()
      }}
    >
      {restProps.children}
    </div>
  )
}
