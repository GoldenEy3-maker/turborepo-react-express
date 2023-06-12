import { cls } from "@/utils/helpers"
import { CSSProperties, DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { useTabsContext } from "./context"
import styles from "./tabs.module.scss"

export const List: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  const [context] = useTabsContext()

  return (
    <div className={cls([className, styles.list])} {...props}>
      <div className={styles.listContainer}>{children}</div>
      <div
        className={styles.line}
        style={
          {
            "--offset": context.activeOffset + "px",
            "--width": context.activeWidth + "px",
          } as CSSProperties
        }
      >
        <div className={styles.lineWrapper} />
      </div>
    </div>
  )
}
