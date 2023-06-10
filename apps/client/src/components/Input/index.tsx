import { setDynamicClass } from "@/utils/helpers"
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
} & JSX.InputHTMLAttributes<HTMLInputElement>

const Input: Component<InputProps> = (props) => {
  const [splitedProps, restProps] = splitProps(props, [
    "leadingIcon",
    "trailingIcon",
    "label",
    "class",
    "validError",
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
      class={setDynamicClass({
        statics: [splitedProps.class, styles.customInput],
        dynamics: [
          [styles._active],
          [styles._withLeading],
          [styles._withTrailing],
          [styles._disabled],
          [styles._notValid],
        ],
        conditions: [
          isActive(),
          !!splitedProps.leadingIcon,
          !!splitedProps.trailingIcon,
          !!restProps.disabled,
          !!splitedProps.validError,
        ],
      })}
    >
      <div class={styles.wrapper}>
        <Show when={splitedProps.leadingIcon}>
          {(icon) => <div class={styles.leading}>{icon()}</div>}
        </Show>
        <label for={restProps.id}>{splitedProps.label}</label>
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
