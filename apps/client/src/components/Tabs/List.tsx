import { setStaticClass } from "@/utils/helpers"
import { type FlowComponent, type JSX } from "solid-js"
import { useTabsContext } from "./context"
import styles from "./tabs.module.scss"

export const List: FlowComponent<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const [context] = useTabsContext()

  return (
    <div {...props} class={setStaticClass(props.class, styles.list)}>
      <div class={styles.listContainer}>{props.children}</div>
      <div
        class={styles.line}
        style={{
          "--offset": context.activeOffset + "px",
          "--width": context.activeWidth + "px",
        }}
      >
        <div class={styles.lineWrapper} />
      </div>
    </div>
  )
}
