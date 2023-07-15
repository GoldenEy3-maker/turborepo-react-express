import Button from "@/components/Button"
import * as Form from "@/components/Form"
import Input from "@/components/Input"
import Logo from "@/components/Logo"
import { useAuthStore } from "@/store/auth"
import { RouterPaths } from "@/utils/enums"
import { cls } from "@/utils/helpers"
import { trpc } from "@/utils/trpc"
import type { FC } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { validateService } from "services"
import type { ValueOf } from "utils/types/helper"
import styles from "./styles.module.scss"

const FormStateKeys = {
  Email: "email",
  Password: "password",
} as const

type FormStateKeys = ValueOf<typeof FormStateKeys>

type FormState = {
  [key in FormStateKeys]: string
}

const SignInPage: FC = () => {
  const navigate = useNavigate()

  const signInMut = trpc.user.signIn.useMutation({
    onSuccess(data) {
      toast.success("Авторизация прошла успешно!")

      useAuthStore.setState({ token: data })

      navigate(RouterPaths.HomePage)
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <>
      <Logo isMinimized={true} />
      <h1 className={cls([styles.title, "page-title _centered"])}>
        Авторизация
      </h1>
      <Form.Root
        onSubmit={handleSubmit((data) => {
          toast.dismiss()

          signInMut.mutate(data)
        })}
      >
        <Form.Inputs>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
              validate(value) {
                if (!validateService.validateEmail(value))
                  return "Невалидный email-адрес!"
              },
            }}
            render={({ field }) => (
              <Input
                label="Email"
                leadingIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 -960 960 960"
                    width="1.5em"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>
                }
                type="email"
                id={FormStateKeys.Email}
                validError={errors.email?.message}
                disabled={signInMut.isLoading}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
            }}
            render={({ field }) => (
              <Input
                label="Пароль"
                leadingIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 -960 960 960"
                    width="1.5em"
                  >
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                  </svg>
                }
                type="password"
                id={FormStateKeys.Password}
                validError={errors.password?.message}
                disabled={signInMut.isLoading}
                {...field}
              />
            )}
          />
        </Form.Inputs>
        <Form.Actions flexEnd>
          <Link to={RouterPaths.SignUpPage} title="Создать аккаунт?">
            Создать аккаунт?
          </Link>

          <Button
            variant="elevated"
            type="submit"
            title="Войти"
            disabled={signInMut.isLoading}
          >
            Войти
          </Button>
        </Form.Actions>
      </Form.Root>
    </>
  )
}

export default SignInPage
