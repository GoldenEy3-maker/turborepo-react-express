import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { cls } from "@/utils/helpers.ts"
import styles from "./select.module.scss"
import { useRippleEffect } from "@/hooks/rippleEffect.ts"
import { useSelectContext } from "@/components/Select/context.tsx"

type OptionsProps = {
  values: string[]
  handler: (value: string) => void
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Options: FC<OptionsProps> = ({ values, handler, className, ...props }) => {
  const rippleEffectEvent = useRippleEffect()
  const [context, setContext] = useSelectContext()

  return (
    <div className={cls([className, styles.options])}
      {...props}>{values.map((value, index) => (
      <button type="button" key={index} onPointerDown={rippleEffectEvent} onClick={() => {
        handler(value)

        setContext(state => ({ ...state, isOpen: false }))

        context.triggerRef.current?.focus()
      }}>
        {value}
      </button>
    ))}</div>
  )
}
