import { createContext, type RefObject, useContext } from "react"
import type { Dispatch, SetStateAction } from "react"

export type SelectContextState = {
  isOpen: boolean
  triggerRef: RefObject<HTMLButtonElement>
}

type SelectContext = [SelectContextState, Dispatch<SetStateAction<SelectContextState>>]

export const SelectContext = createContext<SelectContext | undefined>(undefined)

export const useSelectContext = () => {
  const context = useContext(SelectContext)

  if (!context) throw new Error("SelectContextProvider is lost")

  return context
}