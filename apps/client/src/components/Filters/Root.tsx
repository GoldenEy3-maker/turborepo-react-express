import { cls } from "@/utils/helpers"
import type { FocusEventHandler } from "react"
import {
  useEffect,
  useRef,
  useState,
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
} from "react"
import type { FilterContextState } from "./context"
import { FilterContext } from "./context"
import styles from "./styles.module.scss"

export const Root: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, onBlur, ...props }) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const [contextState, setContextState] = useState<FilterContextState>({
    isOpen: false,
  })

  const handleBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    if (
      event.relatedTarget !== null &&
      rootRef.current?.contains(event.target as HTMLElement) &&
      !rootRef.current?.contains(event.relatedTarget as HTMLElement)
    )
      setContextState((state) => ({ ...state, isOpen: false }))

    if (onBlur) onBlur(event)
  }

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as HTMLElement)) {
        setContextState((state) => ({ ...state, isOpen: false }))
      }
    }

    document.addEventListener("click", handleDocumentClick)

    return () => document.removeEventListener("click", handleDocumentClick)
  }, [])

  return (
    <FilterContext.Provider value={[contextState, setContextState]}>
      <div
        className={cls([className, styles.root])}
        onBlur={handleBlur}
        {...props}
        ref={rootRef}
      >
        {children}
      </div>
    </FilterContext.Provider>
  )
}
