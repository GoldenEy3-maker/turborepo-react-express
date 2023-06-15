import { useEffect } from "react"
import { useLocation } from 'react-router-dom'

export const useModal = () => {
  const location = useLocation()
  const setScrollbarWidth = () => {
    document.body.style.setProperty("--scrollbar-width", (window.innerWidth - document.body.offsetWidth) + "px")
  }

  const openModal = (callback: () => void) => {
    document.body.dataset.lock = 'true'

    callback()
  }

  const closeModal = (callback: () => void) => {
    callback()

    setTimeout(() => {
      document.body.removeAttribute('data-lock')
    }, 200)
  }

  useEffect(() => {
    setScrollbarWidth()

    window.addEventListener("resize", setScrollbarWidth)

    return () => window.removeEventListener("resize", setScrollbarWidth)
  }, [location])



  return [openModal, closeModal]
}