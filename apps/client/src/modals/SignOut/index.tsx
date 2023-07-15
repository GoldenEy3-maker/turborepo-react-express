import Button from "@/components/Button"
import * as Modal from "@/components/Modal"
import { useModal } from "@/hooks/modal.hook"
import { RouterPaths } from "@/utils/enums"
import { trpc } from "@/utils/trpc"
import type { RefObject } from "react"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useSignOutModalStore } from "./store"

const SignOutModal: React.FC = () => {
  const [, closeModal] = useModal()
  const navigate = useNavigate()
  const state = useSignOutModalStore()
  const signOutMut = trpc.user.signOut.useMutation({
    onError(e) {
      console.log(e)
      toast.error(e.message)
    },
    onSuccess() {
      navigate(RouterPaths.SignInPage)
    },
  })
  const rootRef = useRef<HTMLDivElement>(null)

  const autoFocusOnOpenModal = (ref: RefObject<HTMLDivElement>) => {
    if (!ref.current) return

    const interactionElements = ref.current.querySelectorAll(
      "a, button, textarea, input"
    )

    if (interactionElements.length > 0) {
      (
        interactionElements[0] as
          | HTMLButtonElement
          | HTMLAnchorElement
          | HTMLInputElement
          | HTMLTextAreaElement
      ).focus()
    }
  }

  useEffect(() => {
    if (state.state) autoFocusOnOpenModal(rootRef)
  }, [state.state])

  return (
    <Modal.Root ref={rootRef} aria-hidden={!state.state}>
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>Вы действительно уверены?</Modal.Title>
        </Modal.Header>
        <Modal.Content>
          Если вы уверены, что хотите продолжить, подтвердите это действие ниже.
          Если вы желаете остаться в аккаунте, пожалуйста, выберите иной вариант
          ниже.
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="elevated"
            type="button"
            title="Нет, я ошибся"
            disabled={signOutMut.isLoading}
            onClick={() =>
              closeModal(() => {
                useSignOutModalStore.setState({ state: false })
              })
            }
          >
            Нет, я ошибся
          </Button>
          <Button
            variant="elevated"
            clrType="danger"
            type="button"
            title="Да, выйти"
            disabled={signOutMut.isLoading}
            onClick={() => {
              signOutMut.mutate()

              closeModal(() => useSignOutModalStore.setState({ state: false }))
            }}
          >
            Да, выйти
          </Button>
        </Modal.Actions>
      </Modal.Wrapper>
    </Modal.Root>
  )
}

export default SignOutModal
