import type { ResponseMessageType } from "@/components/Form/Response"
import { useEffect, useRef, useState } from "react"

export const useResponseMessage = () => {
  const timerIDRef = useRef<NodeJS.Timeout>()

  const [responseState, setResponseState] = useState(false)
  const [responseMessage, setResponseMessage] = useState<string | undefined>(undefined)
  const [responseType, setResponseType] = useState<ResponseMessageType>(undefined)

  const showResponseMessage = (message: string | undefined, type: ResponseMessageType = undefined, delay?: number) => {
    setResponseMessage(message)
    setResponseState(true)
    setResponseType(type)

    if (timerIDRef.current) {
      clearTimeout(timerIDRef.current)
      timerIDRef.current = undefined
    }

    timerIDRef.current = setTimeout(() => {
      setResponseState(false)
    }, delay ?? 4000)
  }

  const closeResponseMessage = () => {
    if (timerIDRef.current) {
      clearTimeout(timerIDRef.current)
      timerIDRef.current = undefined
    }

    setResponseState(false)
  }

  useEffect(() => {
    return () => clearTimeout(timerIDRef.current)
  }, [])

  return { responseMessage, responseState, responseType, showResponseMessage, closeResponseMessage }
}