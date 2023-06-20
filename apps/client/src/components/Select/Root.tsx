import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./select.module.scss"
import { cls } from "@/utils/helpers.ts"
import { SelectContext, type SelectContextState } from "@/components/Select/context.tsx"
import { useEffect, useRef, useState } from "react"

export const Root: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const [contextState, setContextState] = useState<SelectContextState>({
    isOpen: false,
    triggerRef: { current: null }
  })

  const clickDocumentHandler = (event: MouseEvent) => {
    if (!rootRef.current?.contains(event.target as HTMLElement)) {
      setContextState(state => ({ ...state, isOpen: false }))
    }
  }

  useEffect(() => {
    document.addEventListener("click", clickDocumentHandler)

    return () => document.removeEventListener("click", clickDocumentHandler)
  }, [])

  return (
    <SelectContext.Provider value={[contextState, setContextState]}>
      <div ref={rootRef} className={cls([className, styles.root], {
        [styles._active]: contextState.isOpen
      })} onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as HTMLElement)) {
          setContextState(state => ({ ...state, isOpen: false }))
        }
      }} {...props}>{children}</div>
    </SelectContext.Provider>
  )
}

