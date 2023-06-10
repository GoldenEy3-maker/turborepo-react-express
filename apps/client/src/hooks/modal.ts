import { onCleanup, onMount } from "solid-js"

export const useModal = () => {
  const setScrollbarWidth = () => {
    document.body.style.setProperty("--scrollbar-width", (window.innerWidth - document.body.offsetWidth) + "px")
  }

  const openModal = (callback: () => void) => {
    document.body.dataset.lock = 'true'

    callback()
  }

  onMount(() => {
    setScrollbarWidth()

    window.addEventListener("resize", setScrollbarWidth)
  })

  onCleanup(() => {
    window.removeEventListener("resize", setScrollbarWidth)
  })

  const closeModal = (callback: () => void) => {
    callback()

    setTimeout(() => {
      document.body.removeAttribute('data-lock')
    }, 200)
  }

  return [openModal, closeModal]
}