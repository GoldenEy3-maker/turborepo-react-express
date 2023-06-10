import Button from "@/components/Button"
import * as Form from "@/components/Form"
import Input from "@/components/Input"
import Logo from "@/components/Logo"
import { useResponseMessage } from "@/hooks/responseMessage"
import { RouterPaths } from "@/utils/enums"
import { cls } from "@/utils/helpers"
import { trpc } from "@/utils/trpc"
import { A, useNavigate } from "@solidjs/router"
import type { Errors } from "solid-form-action"
import { createFormActions } from "solid-form-action"
import { type Component } from "solid-js"
import type { ValueOf } from "utils/types"
import styles from "./signIn.module.scss"

const FormStoreKeys = {
  Login: "login",
  Password: "password",
} as const

type FormStoreKeys = ValueOf<typeof FormStoreKeys>

type FormStore = {
  [key in FormStoreKeys]: string
}

const SignInPage: Component = () => {
  const {
    responseState,
    responseMessage,
    responseType,
    showResponseMessage,
    closeResponseMessage,
  } = useResponseMessage()

  const navigator = useNavigate()

  let redirectionTimerID: NodeJS.Timeout | null

  const signInMut = trpc.auth.signIn.useMutation(() => ({
    onSuccess() {
      showResponseMessage(
        "Авторизация прошла успешно!\nЧерез 5 секунд вас направит на главную страницу.",
        "success",
        5000
      )

      redirectionTimerID = setTimeout(() => {
        navigator(RouterPaths.HomePage)
      }, 5000)
    },
    onError(error) {
      showResponseMessage(error.message, "danger")
    },
  }))

  const {
    actions: { login, password },
    errors: validErrors,
    form,
    formState,
  } = createFormActions<FormStore>({
    initialValues: {
      login: "",
      password: "",
    },
    validate: (values) => {
      const errors: Errors<typeof values> = {}

      if (values.login.length === 0) {
        errors.login = "Обязательное поле для заполнения!"
      }

      if (values.password.length === 0) {
        errors.password = "Обязательное поле для заполнения!"
      }

      return errors
    },
    onSubmit: async (values) => {
      closeResponseMessage()

      if (redirectionTimerID) {
        clearTimeout(redirectionTimerID)
        redirectionTimerID = null
      }

      signInMut.mutate({
        login: values.login,
        password: values.password,
      })
    },
  })

  return (
    <>
      <Logo isMinimized={true} />
      <h1 class={cls([styles.title, "page-title _centered"])}>Авторизация</h1>
      <Form.Root ref={(ref) => form(ref)}>
        <Form.Inputs>
          <Input
            label="Логин"
            leadingIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" />
              </svg>
            }
            type="text"
            id={FormStoreKeys.Login}
            name={FormStoreKeys.Login}
            ref={login}
            value={formState.login}
            validError={validErrors.login}
            disabled={signInMut.isPending}
          />
          <Input
            label="Пароль"
            leadingIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
              </svg>
            }
            type="password"
            id={FormStoreKeys.Password}
            name={FormStoreKeys.Password}
            ref={password}
            value={formState.password}
            validError={validErrors.password}
            disabled={signInMut.isPending}
          />
        </Form.Inputs>
        <Form.Response state={responseState()} type={responseType()}>
          {responseMessage()}
        </Form.Response>
        <Form.Actions flexEnd>
          <A href={RouterPaths.SignUpPage} title="Создать аккаунт?">
            Создать аккаунт?
          </A>
          <Button
            variant="elevated"
            type="submit"
            title="Войти"
            disabled={signInMut.isPending}
          >
            Войти
          </Button>
        </Form.Actions>
      </Form.Root>
    </>
  )
}

export default SignInPage