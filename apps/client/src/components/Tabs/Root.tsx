import { cls } from "@/utils/helpers"
import type { FlowComponent, JSX } from "solid-js"
import { TabsContextProvider } from "./context"
import styles from "./tabs.module.scss"

export const Root: FlowComponent<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <TabsContextProvider>
      <div {...props} class={cls([props.class, styles.root])}>
        {props.children}
      </div>
    </TabsContextProvider>
  )
}
