import { cls } from "@/utils/helpers"
import {
  Show,
  createEffect,
  createSignal,
  splitProps,
  type Component,
  type JSX,
} from "solid-js"
import styles from "./input.module.scss"

type InputProps = {
  label: string
  leadingIcon?: JSX.Element
  trailingIcon?: JSX.Element
  validError?: string | string[]
  isMaskPatter?: boolean
} & JSX.InputHTMLAttributes<HTMLInputElement>

const Input: Component<InputProps> = (props) => {
  const [splitedProps, restProps] = splitProps(props, [
    "leadingIcon",
    "trailingIcon",
    "label",
    "class",
    "validError",
    "isMaskPatter",
  ])

  const [isActive, setIsActive] = createSignal(false)
  const [isFocus, setIsFocus] = createSignal(false)

  createEffect(() => {
    if (!isFocus()) {
      setIsActive(!!restProps.value)
    }
  })

  return (
    <div
      class={cls([splitedProps.class, styles.customInput], {
        [styles._active]: isActive(),
        [styles._withLeading]: !!splitedProps.leadingIcon,
        [styles._withTrailing]: !!splitedProps.trailingIcon,
        [styles._disabled]: !!restProps.disabled,
        [styles._notValid]: !!splitedProps.validError,
      })}
    >
      <div class={styles.wrapper}>
        <Show when={splitedProps.leadingIcon}>
          {(icon) => <div class={styles.leading}>{icon()}</div>}
        </Show>
        <label class={styles.label} for={restProps.id}>
          {splitedProps.label}
        </label>
        <Show when={splitedProps.isMaskPatter}>
          <label class={styles.maskPatter} for={restProps.id} />
        </Show>
        <input
          {...restProps}
          onFocus={() => {
            setIsActive(true)
            setIsFocus(true)
          }}
          onBlur={() => {
            if (!restProps.value) setIsActive(false)

            setIsFocus(false)
          }}
        />
        <Show when={splitedProps.trailingIcon}>
          {(icon) => <div class={styles.trailing}>{icon()}</div>}
        </Show>
      </div>

      <div class={styles.errorMessage}>
        <p>{splitedProps.validError}</p>
      </div>
    </div>
  )
}

export default Input
