import type { ResponseMessageType } from "@/components/Form/Response"
import { createSignal } from "solid-js"

export const useResponseMessage = () => {
  let timerID: NodeJS.Timeout | null

  const [responseState, setResponseState] = createSignal(false)
  const [responseMessage, setResponseMessage] = createSignal<string | undefined>(undefined)
  const [responseType, setResponseType] = createSignal<ResponseMessageType>(undefined)

  const showResponseMessage = (message: string | undefined, type: ResponseMessageType = undefined, delay?: number) => {
    setResponseMessage(message)
    setResponseState(true)
    setResponseType(type)

    if (timerID) {
      clearTimeout(timerID)
      timerID = null
    }

    timerID = setTimeout(() => {
      setResponseState(false)
    }, delay ?? 4000)
  }

  const closeResponseMessage = () => {
    if (timerID) {
      clearTimeout(timerID)
      timerID = null
    }

    setResponseState(false)
  }

  return { responseMessage, responseState, responseType, showResponseMessage, closeResponseMessage }
}