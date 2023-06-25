import { cls } from "@/utils/helpers"
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react"
import Button from "../Button"
import { useFilterContext } from "./context"
import styles from "./styles.module.scss"

export const Trigger: FC<
  Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "ref" | "type"
  >
> = ({ className, children, ...props }) => {
  const [_contextState, setContextState] = useFilterContext()

  const toggle = () => {
    setContextState((state) => ({ ...state, isOpen: !state.isOpen }))
  }

  return (
    <Button
      className={cls([className, styles.trigger])}
      type="button"
      isIcon
      onClick={toggle}
      {...props}
    >
      {children}
    </Button>
  )
}
