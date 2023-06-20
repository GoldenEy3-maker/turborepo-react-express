import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom"
import type { FC, RefAttributes } from "react"
import { cls } from "@/utils/helpers.ts"
import styles from "./link.module.scss"
import { useRippleEffect } from "@/hooks/rippleEffect.ts"

type LinkProps = {} & RouterLinkProps & RefAttributes<HTMLAnchorElement>

const Link: FC<LinkProps> = ({ className, children, onPointerDown, ...props }) => {
  const rippleEffectEvent = useRippleEffect()
  return (
    <RouterLink className={cls([className, styles.link])} onPointerDown={event => {
      rippleEffectEvent(event)

      if (onPointerDown) onPointerDown(event)
    }
    } {...props}>{children}</RouterLink>
  )
}
export default Link
