import type { CSSProperties, DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { cls } from "@/utils/helpers.ts"
import styles from "./table.module.scss"

type RootProps = {
  template: string
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Root: FC<RootProps> = ({
  template,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cls([className, styles.root])}
      style={{ "--_template": template } as CSSProperties} {...props}>{children}</div>
  )
}