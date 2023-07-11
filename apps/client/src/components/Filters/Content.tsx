import { cls } from "@/utils/helpers"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { useFilterContext } from "./context"
import styles from "./styles.module.scss"

export const Content: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  const [contextState] = useFilterContext()

  return (
    <div
      className={cls([className, styles.content])}
      {...props}
      aria-hidden={!contextState.isOpen}
    >
      {children}
    </div>
  )
}
