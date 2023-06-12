import { cls } from "@/utils/helpers"
import { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { TabsContextProvider } from "./context"
import styles from "./tabs.module.scss"

export const Root: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <TabsContextProvider>
      <div className={cls([className, styles.root])} {...props}>
        {children}
      </div>
    </TabsContextProvider>
  )
}
