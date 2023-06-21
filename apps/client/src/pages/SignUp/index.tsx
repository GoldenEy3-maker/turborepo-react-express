import Button from "@/components/Button"
import * as Form from "@/components/Form"
import Input from "@/components/Input"
import Logo from "@/components/Logo"
import * as Tabs from "@/components/Tabs"
import { InputMaskPatterns, PageQueryKeys, RouterPaths } from "@/utils/enums"
import { trpc } from "@/utils/trpc"
import type { FC } from "react"
import { Controller, useForm } from "react-hook-form"
import InputMask from "react-input-mask"
import { Link, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { dateDiff, formatDate, validateDatePattern } from "utils"
import type { ValueOf } from "utils/types"
import styles from "./signUp.module.scss"

const FormStateKeys = {
  FirstName: "firstName",
  LastName: "lastName",
  MiddleName: "middleName",
  Login: "login",
  Password: "password",
  RepeatPassword: "repeatPassword",
  BirthDate: "birthDate",
} as const

type FormStateKeys = ValueOf<typeof FormStateKeys>

type FormState = {
  [Key in FormStateKeys]: string
} & {
  role: RoleTabKeys
}

const RoleTabKeys = {
  EMPLOYER: "EMPLOYER",
  PERFORMER: "PERFORMER",
} as const

type RoleTabKeys = ValueOf<typeof RoleTabKeys>

const SignUpPage: FC = () => {
  const location = useLocation()

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

  const signUpMut = trpc.auth.signUp.useMutation({
    onError(error) {
      toast(error.message, { type: "error" })
    },
    onSuccess() {
      toast(
        <p>
          Регистрация прошла успешно! Теперь вы можете
          <Link to={RouterPaths.SignInPage}> авторизоваться</Link>!
        </p>,
        { type: "success" }
      )

      reset()
    },
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    reset,
  } = useForm<FormState>({
    defaultValues: {
      birthDate: "",
      firstName: "",
      lastName: "",
      login: "",
      middleName: "",
      password: "",
      repeatPassword: "",
      role: parseQuery(queryKey, queryValue),
    },
    mode: "onChange",
  })

  return (
    <>
      <Logo isMinimized={true} />
      <h1 className="page-title _centered">Регистрация</h1>

      <Form.Root
        onSubmit={handleSubmit((data) => {
          toast.dismiss()

          signUpMut.mutate({ ...data, birthDate: formatDate(data.birthDate) })
        })}
        noValidate
      >
        <Tabs.Root className={styles.tabs}>
          <Tabs.List>
            <Controller
              name="role"
              control={control}
              render={({ field: { value, ...props } }) => (
                <Tabs.Item
                  label="Работодатель"
                  id={RoleTabKeys.EMPLOYER}
                  value={RoleTabKeys.EMPLOYER}
                  checked={value === RoleTabKeys.EMPLOYER}
                  disabled={signUpMut.isLoading}
                  {...props}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field: { value, ...props } }) => (
                <Tabs.Item
                  label="Исполнитель"
                  id={RoleTabKeys.PERFORMER}
                  value={RoleTabKeys.PERFORMER}
                  checked={value === RoleTabKeys.PERFORMER}
                  disabled={signUpMut.isLoading}
                  {...props}
                />
              )}
            />
          </Tabs.List>
        </Tabs.Root>
        <Form.Inputs>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
              pattern: {
                value: new RegExp(/^[А-ЯЁа-яё]+$/, "g"),
                message: "Только кириллица!",
              },
            }}
            render={({ field }) => (
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
                disabled={signUpMut.isLoading}
                validError={errors.firstName?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
              pattern: {
                value: new RegExp(/^[А-ЯЁа-яё]+$/, "g"),
                message: "Только кириллица!",
              },
            }}
            render={({ field }) => (
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
                disabled={signUpMut.isLoading}
                validError={errors.lastName?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="middleName"
            control={control}
            rules={{
              pattern: {
                value: new RegExp(/^[А-ЯЁа-яё]+$/, "g"),
                message: "Только кириллица!",
              },
            }}
            render={({ field }) => (
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
                disabled={signUpMut.isLoading}
                {...field}
              />
            )}
          />

          <Controller
            name="birthDate"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
              validate(value) {
                if (!validateDatePattern(value)) return "Невалидная дата!"

                const { years } = dateDiff(
                  new Date(),
                  new Date(formatDate(value))
                )

                if (years < 16)
                  return "К сожалению мы не можем предоставить вам аккаунт в силу вашего возраста!"
              },
            }}
            render={({ field }) => (
              <InputMask
                mask={InputMaskPatterns.Date}
                maskPlaceholder="ДД-ММ-ГГГГ"
                disabled={signUpMut.isLoading}
                {...field}
              >
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
                  validError={errors.birthDate?.message}
                />
              </InputMask>
            )}
          />

          <Controller
            control={control}
            name="login"
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
            }}
            render={({ field }) => (
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
                disabled={signUpMut.isLoading}
                validError={errors.login?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
              validate(value) {
                if (value.length < 8)
                  return "Пароль должен быть не менее 8 символов!"

                if (!new RegExp(/[A-ZА-ЯЁ]/, "g").test(value))
                  return "Пароль должен содержать не менее одной заглавной буквы!"
              },
            }}
            render={({ field }) => (
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
                disabled={signUpMut.isLoading}
                validError={errors.password?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="repeatPassword"
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
              validate(value) {
                if (getValues("password") !== value)
                  return "Пароль не совпадает!"
              },
            }}
            render={({ field }) => (
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
                disabled={signUpMut.isLoading}
                validError={errors.repeatPassword?.message}
                {...field}
              />
            )}
          />
        </Form.Inputs>

        <Form.Actions flexEnd>
          <Link to={RouterPaths.SignInPage} title="Есть аккаунт?">
            Есть аккаунт?
          </Link>
          <Button
            variant="elevated"
            type="submit"
            title="Создать"
            disabled={signUpMut.isLoading}
          >
            Создать
          </Button>
        </Form.Actions>
      </Form.Root>
    </>
  )
}

export default SignUpPage
