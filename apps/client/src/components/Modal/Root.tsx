import { cls } from "@/utils/helpers"
import React from "react"
import styles from "./styles.module.scss"

type RootProps = {
  closeHandler?: () => void
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Root = React.forwardRef<HTMLDivElement, RootProps>(
  ({ closeHandler, className, children, ...props }, ref) => {
    return (
      <div
        className={cls([className, styles.root])}
        ref={ref}
        onPointerDown={(e) => {
          if (
            !(e.target as HTMLElement).closest("[data-modal-prevent]") &&
            closeHandler
          )
            closeHandler()
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
