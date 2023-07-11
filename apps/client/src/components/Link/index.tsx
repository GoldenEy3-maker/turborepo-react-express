import { useRippleEffect } from "@/hooks/rippleEffect.hook"
import { cls } from "@/utils/helpers.ts"
import type { FC, RefAttributes } from "react"
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom"
import styles from "./styles.module.scss"

const Link: FC<RouterLinkProps & RefAttributes<HTMLAnchorElement>> = ({
  className,
  children,
  onPointerDown,
  ...props
}) => {
  const rippleEffectEvent = useRippleEffect()
  return (
    <RouterLink
      className={cls([className, styles.link])}
      onPointerDown={(event) => {
        rippleEffectEvent(event)

        if (onPointerDown) onPointerDown(event)
      }}
      {...props}
    >
      {children}
    </RouterLink>
  )
}
export default Link
