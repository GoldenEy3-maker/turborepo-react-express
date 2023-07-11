import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react"
import Button from "../Button"
import { useFilterContext } from "./context"

export const Trigger: FC<
  Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "ref" | "type"
  >
> = ({ className, children, ...props }) => {
  const [, setContextState] = useFilterContext()

  const toggle = () => {
    setContextState((state) => ({ ...state, isOpen: !state.isOpen }))
  }

  return (
    <Button
      className={className}
      type="button"
      isIcon
      onClick={toggle}
      {...props}
    >
      {children}
    </Button>
  )
}
