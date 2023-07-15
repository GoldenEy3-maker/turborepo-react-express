import {
  SelectContext,
  type SelectContextState,
} from "@/components/Select/context.tsx"
import { cls } from "@/utils/helpers.ts"
import { useEffect, useRef, useState } from "react"
import styles from "./styles.module.scss"

type RootProps = {
  label?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Root: React.FC<RootProps> = ({
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

  const closeOnDocClick = (event: MouseEvent) => {
    if (!rootRef.current?.contains(event.target as HTMLElement)) {
      setContextState((state) => ({ ...state, isOpen: false }))
    }
  }

  const closeOnBlur: React.FocusEventHandler = (event) => {
    if (!rootRef.current?.contains(event.relatedTarget as HTMLElement)) {
      setContextState((state) => ({ ...state, isOpen: false }))
    }
  }

  useEffect(() => {
    document.addEventListener("click", closeOnDocClick)

    return () => document.removeEventListener("click", closeOnDocClick)
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
        <div className={styles.wrapper} ref={rootRef} onBlur={closeOnBlur}>
          {children}
        </div>
      </div>
    </SelectContext.Provider>
  )
}
