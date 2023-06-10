import Button from "@/components/Button"
import * as Modal from "@/components/Modal"
import { useModal } from "@/hooks/modal"
import { RouterPaths } from "@/utils/enums"
import { trpc } from "@/utils/trpc"
import { useNavigate } from "@solidjs/router"
import { type Component } from "solid-js"
import { useSignOutModalStore } from "./store"

const SignOutModal: Component = () => {
  const [_, closeModal] = useModal()
  const navigate = useNavigate()
  const state = useSignOutModalStore()
  const signOutMut = trpc.auth.signOut.useMutation(() => ({
    onError(errors) {
      console.log(errors)
    },
    onSuccess() {
      navigate(RouterPaths.SignInPage)
    },
  }))

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
            disabled={signOutMut.isPending}
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
            isDanger
            type="button"
            title="Да, выйти"
            disabled={signOutMut.isPending}
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
