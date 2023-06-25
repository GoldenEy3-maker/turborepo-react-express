import Button from "@/components/Button"
import { useSelectContext } from "@/components/Select/context.tsx"
import { cls } from "@/utils/helpers.ts"
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react"
import { useEffect, useRef } from "react"
import styles from "./styles.module.scss"

export const Trigger: FC<
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "type"
  >
> = ({ value, className, ...props }) => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [_, setContext] = useSelectContext()

  useEffect(() => {
    setContext((state) => ({ ...state, triggerRef }))
  }, [setContext])

  return (
    <div className={cls([className, styles.trigger])}>
      <input type="button" value={value} readOnly={true} {...props} />
      <Button
        variant="elevated"
        ref={triggerRef}
        onClick={() =>
          setContext((state) => ({ ...state, isOpen: !state.isOpen }))
        }
      >
        <p>{value}</p>
        <span className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
          </svg>
        </span>
      </Button>
    </div>
  )
}
