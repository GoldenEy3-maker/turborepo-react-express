import type { NotifyType } from '@/components/Notify/index'
import { useCallback, useEffect, useRef, useState } from "react"

type ShowNotifyFunc = (options: { message: string, title?: string, type?: NotifyType, delay?: number }) => void

export const useNotify = () => {
  const notifyRef = useRef<HTMLDivElement>(null)
  const timerIDRef = useRef<NodeJS.Timeout>()

  const [notifyState, setNotifyState] = useState(false)
  const [notifyMessage, setNotifyMessage] = useState<string>()
  const [notifyTitle, setNotifyTitle] = useState<string>()
  const [notifyType, setNotifyType] = useState<NotifyType>()

  const cancelTimer = () => {
    if (timerIDRef.current) {
      clearTimeout(timerIDRef.current)
      timerIDRef.current = undefined
    }
  }

  const setTimer = useCallback(() => {
    timerIDRef.current = setTimeout(() => {
      setNotifyState(false)
      notifyRef.current?.removeEventListener("pointerenter", cancelTimer)
      notifyRef.current?.removeEventListener('pointerleave', setTimer)
    }, 4000)
  }, [])

  const showNotify: ShowNotifyFunc = ({ message, title, type }) => {
    setNotifyMessage(message)
    setNotifyState(true)
    setNotifyType(type)
    setNotifyTitle(title)

    cancelTimer()

    setTimer()

    notifyRef.current?.addEventListener("pointerenter", cancelTimer)
    notifyRef.current?.addEventListener('pointerleave', setTimer)
  }

  const closeNotify = () => {
    cancelTimer()

    setNotifyState(false)

    notifyRef.current?.removeEventListener("pointerenter", cancelTimer)
    notifyRef.current?.removeEventListener('pointerleave', setTimer)
  }

  useEffect(() => {
    const ref = notifyRef.current

    return () => {
      cancelTimer()

      ref?.removeEventListener("pointerenter", cancelTimer)
      ref?.removeEventListener('pointerleave', setTimer)
    }
  }, [setTimer])

  return { notifyMessage, notifyTitle, notifyState, notifyType, showNotify, closeNotify, notifyRef }
}