import { useRippleEffect } from "@/hooks/rippleEffect"
import { cls } from "@/utils/helpers"
import { createEffect, splitProps, type Component, type JSX } from "solid-js"
import { useTabsContext } from "./context"
import styles from "./tabs.module.scss"

type ItemProps = {
  label: string
} & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type">

export const Item: Component<ItemProps> = (props) => {
  const [splitedProps, restProps] = splitProps(props, ["label"])

  let itemRef: HTMLLabelElement | undefined

  const [context, setContext] = useTabsContext()

  const rippleEffectEvent = useRippleEffect()

  createEffect(() => {
    if (restProps.checked && itemRef) {
      setContext({
        activeWidth: itemRef.offsetWidth,
        activeOffset: itemRef.offsetLeft,
      })
    }
  })

  return (
    <div
      class={cls([restProps.class, styles.item], {
        [styles._active]: !!restProps.checked,
      })}
    >
      <label for={restProps.id} onPointerDown={rippleEffectEvent} ref={itemRef}>
        {splitedProps.label}
      </label>
      <input {...restProps} type="radio" />
    </div>
  )
}
