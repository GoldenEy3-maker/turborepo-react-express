import { useRippleEffect } from "@/hooks/rippleEffect.hook"
import { cls } from "@/utils/helpers"
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"
import { forwardRef } from "react"
import styles from "./styles.module.scss"

export type ButtonProps = {
  variant?: "elevated" | "filled"
  clrType?: "danger" | "success" | "warning"
  isIcon?: boolean
  children?: ReactNode
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, onPointerDown, variant, clrType, isIcon, ...props },
    ref
  ) => {
    const rippleEffectEvent = useRippleEffect()

    const isSubmitDisabled = props.type === "submit" && props.disabled

    return (
      <button
        ref={ref}
        className={cls([className, styles.button], {
          [styles._filled]: variant === "filled",
          [styles._elevated]: variant === "elevated",
          [styles._danger]: clrType === "danger",
          [styles._success]: clrType === "success",
          [styles._warning]: clrType === "warning",
          [styles._icon]: !!isIcon,
        })}
        onPointerDown={(event) => {
          rippleEffectEvent(event)

          if (onPointerDown) onPointerDown(event)
        }}
        {...props}
      >
        {isSubmitDisabled ? (
          <span className={styles.loader}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" />
            </svg>
          </span>
        ) : null}
        {isSubmitDisabled && isIcon ? null : children}
      </button>
    )
  }
)

export default Button
