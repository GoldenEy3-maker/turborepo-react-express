import Button from "@/components/Button"
import * as Modal from "@/components/Modal"
import { useModal } from "@/hooks/modal.hook"
import { RouterPaths } from "@/utils/enums"
import { trpc } from "@/utils/trpc"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useSignOutModalStore } from "./store"

const SignOutModal: FC = () => {
  const [, closeModal] = useModal()
  const navigate = useNavigate()
  const state = useSignOutModalStore()
  const signOutMut = trpc.user.signOut.useMutation({
    onError(errors) {
      console.log(errors)
    },
    onSuccess() {
      navigate(RouterPaths.SignInPage)
    },
  })

  return (
    <Modal.Root aria-hidden={!state.state}>
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>Выход</Modal.Title>
        </Modal.Header>
        <Modal.Content>
          Вы действительно хотите покинуть данный аккаунт?
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
