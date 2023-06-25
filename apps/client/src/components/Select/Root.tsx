import {
  SelectContext,
  type SelectContextState,
} from "@/components/Select/context.tsx"
import { cls } from "@/utils/helpers.ts"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { useEffect, useRef, useState } from "react"
import styles from "./styles.module.scss"

type RootProps = {
  label?: string
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Root: FC<RootProps> = ({
  label,
  className,
  children,
  ...props
}) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const [contextState, setContextState] = useState<SelectContextState>({
    isOpen: false,
    triggerRef: { current: null },
  })

  const clickDocumentHandler = (event: MouseEvent) => {
    if (!rootRef.current?.contains(event.target as HTMLElement)) {
      setContextState((state) => ({ ...state, isOpen: false }))
    }
  }

  useEffect(() => {
    document.addEventListener("click", clickDocumentHandler)

    return () => document.removeEventListener("click", clickDocumentHandler)
  }, [])

  return (
    <SelectContext.Provider value={[contextState, setContextState]}>
      <div
        className={cls([className, styles.root], {
          [styles._active]: contextState.isOpen,
        })}
        {...props}
      >
        {label ? <span className={styles.label}>{label}</span> : null}
        <div
          className={styles.wrapper}
          ref={rootRef}
          onBlur={(event) => {
            if (
              !rootRef.current?.contains(event.relatedTarget as HTMLElement)
            ) {
              setContextState((state) => ({ ...state, isOpen: false }))
            }
          }}
        >
          {children}
        </div>
      </div>
    </SelectContext.Provider>
  )
}
