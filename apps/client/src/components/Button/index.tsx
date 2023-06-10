import { useRippleEffect } from "@/hooks/rippleEffect"
import { setDynamicClass } from "@/utils/helpers"
import { splitProps, type FlowComponent, type JSX } from "solid-js"
import styles from "./button.module.scss"

type ButtonProps = {
  variant?: "elevated" | "filled"
  isDanger?: boolean
  isIcon?: boolean
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>

const Button: FlowComponent<ButtonProps> = (props) => {
  const [splitedProps, restProps] = splitProps(props, [
    "variant",
    "isDanger",
    "isIcon",
  ])

  const rippleEffectEvent = useRippleEffect()

  return (
    <button
      {...restProps}
      class={setDynamicClass({
        statics: [restProps.class, styles.button],
        dynamics: [[styles._filled], [styles._elevated], [styles._icon]],
        conditions: [
          splitedProps.variant === "filled",
          splitedProps.variant === "elevated",
          !!splitedProps.isIcon,
        ],
      })}
      onPointerDown={rippleEffectEvent}
    >
      {restProps.type === "submit" ? (
        <div class={styles.loader}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" />
            </svg>
          </span>
        </div>
      ) : null}
      {restProps.children}
    </button>
  )
}

export default Button
