import Button from "@/components/Button"
import * as Form from "@/components/Form"
import Input from "@/components/Input"
import Logo from "@/components/Logo"
import * as Tabs from "@/components/Tabs"
import { useResponseMessage } from "@/hooks/responseMessage"
import { InputMaskPatterns, PageQueryKeys, RouterPaths } from "@/utils/enums"
import { trpc } from "@/utils/trpc"
import { createInputMask } from "@solid-primitives/input-mask"
import { A, useLocation } from "@solidjs/router"
import type { Errors } from "solid-form-action"
import { createFormActions } from "solid-form-action"
import type { JSX } from "solid-js"
import { createSignal, type Component } from "solid-js"
import { dateDiff, formatDate, validateDatePattern } from "utils"
import type { ValueOf } from "utils/types"
import styles from "./signUp.module.scss"

const FormStoreKeys = {
  FirstName: "firstName",
  LastName: "lastName",
  MiddleName: "middleName",
  Login: "login",
  Password: "password",
  RepeatPassword: "repeatPassword",
  BirthDate: "birthDate",
} as const

type FormStoreKeys = ValueOf<typeof FormStoreKeys>

type FormStore = {
  [Key in FormStoreKeys]: string
}

const RoleTabKeys = {
  EMPLOYER: "EMPLOYER",
  PERFORMER: "PERFORMER",
} as const

type RoleTabKeys = ValueOf<typeof RoleTabKeys>

const SignUpPage: Component = () => {
  const {
    closeResponseMessage,
    responseState,
    responseMessage,
    responseType,
    showResponseMessage,
  } = useResponseMessage()

  const location = useLocation()

  let resetButtonRef: HTMLButtonElement | undefined

  const [queryKey, queryValue] = location.search.replace("?", "").split("=")

  const parseQuery = (key: string, value: string) => {
    if (
      key === PageQueryKeys.SignUp.Tab &&
      Object.values(RoleTabKeys).includes(value.toUpperCase() as RoleTabKeys)
    ) {
      return value.toUpperCase() as RoleTabKeys
    }

    return RoleTabKeys.EMPLOYER
  }

  const [roleTabs, setRoleTabs] = createSignal<RoleTabKeys>(
    parseQuery(queryKey, queryValue)
  )

  const tabsHandler: JSX.EventHandler<HTMLInputElement, Event> = (event) => {
    setRoleTabs(event.currentTarget.value as RoleTabKeys)
  }

  const signUpMut = trpc.auth.signUp.useMutation(() => ({
    onError(error) {
      showResponseMessage(error.message, "danger")
    },
    onSuccess(data) {
      showResponseMessage(
        data.message + "\nТеперь вы можете авторизоваться по ссылке ниже",
        "success"
      )

      resetButtonRef?.click()
    },
  }))

  const {
    actions,
    form,
    formState,
    errors: validErrors,
    reset,
  } = createFormActions<FormStore>({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      login: "",
      password: "",
      repeatPassword: "",
      birthDate: "",
    },
    validate(values) {
      const errors: Errors<typeof values> = {}

      if (values.firstName.length === 0)
        errors.firstName = "Обязательное поле для заполнения!"

      if (values.lastName.length === 0)
        errors.lastName = "Обязательное поле для заполнения!"

      if (values.birthDate.length === 0) {
        errors.birthDate = "Обязательное поле для заполнения!"
      } else if (!validateDatePattern(values.birthDate)) {
        errors.birthDate = "Невалидная дата!"
      } else {
        const { years } = dateDiff(
          new Date(),
          new Date(formatDate(values.birthDate))
        )

        if (years < 16)
          errors.birthDate =
            "Мы не можем предоставить вам аккаунт в силу вашего возраста!"
      }

      if (values.login.length === 0)
        errors.login = "Обязательное поле для заполнения!"

      if (values.password.length === 0)
        errors.password = "Обязательное поле для заполнения!"
      else if (values.password.length < 8)
        errors.password = "Пароль должен быть не менее 8 символов!"
      else if (!new RegExp(/[А-ЯЁA-Z]/, "g").test(values.password))
        errors.password =
          "Пароль должен содержать не менее одной заглавной буквы!"

      if (values.repeatPassword.length === 0)
        errors.repeatPassword = "Обязательное поле для заполнения!"
      else if (values.repeatPassword !== values.password)
        errors.repeatPassword = "Пароль не совпадает!"

      return errors
    },
    onSubmit(values) {
      closeResponseMessage()

      signUpMut.mutate({
        ...values,
        birthDate: formatDate(values.birthDate),
        role: roleTabs(),
      })
    },
  })

  return (
    <>
      <Logo isMinimized={true} />
      <h1 class="page-title _centered">Регистрация</h1>
      <Tabs.Root class={styles.tabs}>
        <Tabs.List>
          <Tabs.Item
            label="Работодатель"
            id={RoleTabKeys.EMPLOYER}
            value={RoleTabKeys.EMPLOYER}
            name="reg-role"
            checked={roleTabs() === RoleTabKeys.EMPLOYER}
            onChange={tabsHandler}
            disabled={signUpMut.isPending}
          />
          <Tabs.Item
            label="Работник"
            id={RoleTabKeys.PERFORMER}
            value={RoleTabKeys.PERFORMER}
            name="reg-role"
            checked={roleTabs() === RoleTabKeys.PERFORMER}
            onChange={tabsHandler}
            disabled={signUpMut.isPending}
          />
        </Tabs.List>
      </Tabs.Root>
      <Form.Root ref={(ref) => form(ref)} noValidate>
        <Form.Inputs>
          <Input
            label="Имя"
            type="text"
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
            ref={actions.firstName}
            value={formState.firstName}
            validError={validErrors.firstName}
            disabled={signUpMut.isPending}
          />
          <Input
            label="Фамилия"
            type="text"
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
            ref={actions.lastName}
            value={formState.lastName}
            validError={validErrors.lastName}
            disabled={signUpMut.isPending}
          />
          <Input
            label="Отчество"
            type="text"
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
            ref={actions.middleName}
            value={formState.middleName}
            validError={validErrors.middleName}
            disabled={signUpMut.isPending}
          />
          <Input
            label="Дата рождения"
            type="text"
            leadingIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
              </svg>
            }
            ref={actions.birthDate}
            value={formState.birthDate}
            validError={validErrors.birthDate}
            placeholder="ДД.ММ.ГГГГ"
            onInput={createInputMask(InputMaskPatterns.Date)}
            disabled={signUpMut.isPending}
          />

          <Input
            label="Логин"
            type="text"
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
            ref={actions.login}
            value={formState.login}
            validError={validErrors.login}
            disabled={signUpMut.isPending}
          />
          <Input
            label="Пароль"
            type="password"
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
            ref={actions.password}
            value={formState.password}
            validError={validErrors.password}
            disabled={signUpMut.isPending}
          />
          <Input
            label="Повторите пароль"
            type="password"
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
            ref={actions.repeatPassword}
            value={formState.repeatPassword}
            validError={validErrors.repeatPassword}
            disabled={signUpMut.isPending}
          />
        </Form.Inputs>

        <Form.Response state={responseState()} type={responseType()}>
          {responseMessage()}
        </Form.Response>
        <Form.Actions flexEnd>
          <button
            type="reset"
            onClick={reset}
            title="Очистить"
            ref={resetButtonRef}
            style={{ display: "none" }}
          >
            Очистить
          </button>
          <A href={RouterPaths.SignInPage} title="Есть аккаунт?">
            Есть аккаунт?
          </A>
          <Button
            variant="elevated"
            type="submit"
            title="Создать"
            disabled={signUpMut.isPending}
          >
            Создать
          </Button>
        </Form.Actions>
      </Form.Root>
    </>
  )
}

export default SignUpPage
