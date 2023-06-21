import Button from "@/components/Button"
import * as Form from "@/components/Form"
import Input from "@/components/Input"
import * as Section from "@/components/Section"
import { InputMaskPatterns } from "@/utils/enums"
import { trpc } from "@/utils/trpc"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import InputMask from "react-input-mask"
import { toast } from "react-toastify"
import { getCookieObject, validateEmail, validateTelPattern } from "utils"
import { CookieKeys } from "utils/enums"
import type { AuthCookie, ValueOf } from "utils/types"

const FormStateKeys = {
  FirstName: "firstName",
  LastName: "lastName",
  MiddleName: "middleName",
  Login: "login",
  Email: "email",
  Tel: "tel",
  OldPassword: "oldPassword",
  NewPassword: "newPassword",
} as const

type FormStateKeys = ValueOf<typeof FormStateKeys>

type FormState = {
  [Key in FormStateKeys]: string
}

const EdiInfoForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      tel: "",
      email: "",
      firstName: "",
      lastName: "",
      login: "",
      middleName: "",
      newPassword: "",
      oldPassword: "",
    },
    mode: "onChange",
    shouldFocusError: false,
  })

  const updateInfoMut = trpc.user.updateInfo.useMutation({
    onSuccess(data) {
      if (data) {
        toast(data.message, {
          type: "success",
        })

        setValue("newPassword", "")
        setValue("oldPassword", "")
      }
    },
    onError(error) {
      toast(error.message, {
        type: "error",
      })
    },
  })

  useEffect(() => {
    const authCookie = getCookieObject<AuthCookie>(CookieKeys.AuthToken)

    if (authCookie) {
      setValue("firstName", authCookie.firstName)
      setValue("lastName", authCookie.lastName)
      setValue("middleName", authCookie.middleName ?? "")
      setValue("login", authCookie.login)
      setValue("email", authCookie.email ?? "")
      setValue("tel", authCookie.tel ?? "")
    }
  }, [setValue])

  return (
    <Section.Root>
      <Section.Header isCenter>
        <Section.Title>Изменить личную информацию</Section.Title>
      </Section.Header>
      <Section.Content isCenter>
        <Form.Root
          withGroups
          onSubmit={handleSubmit((data) => {
            toast.dismiss()

            updateInfoMut.mutate(data)
          })}
          noValidate
        >
          <Form.Inputs>
            <Form.Group>
              <Controller
                control={control}
                name="firstName"
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
                    validError={errors.firstName?.message}
                    disabled={updateInfoMut.isLoading}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="lastName"
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
                    validError={errors.lastName?.message}
                    disabled={updateInfoMut.isLoading}
                    {...field}
                  />
                )}
              />
            </Form.Group>
            <Form.Group>
              <Controller
                control={control}
                name="middleName"
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
                    validError={errors.middleName?.message}
                    disabled={updateInfoMut.isLoading}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="tel"
                rules={{
                  validate(value) {
                    if (value.length !== 0 && !validateTelPattern(value))
                      return "Невалидный номер телефона!"
                  },
                }}
                render={({ field }) => (
                  <InputMask
                    mask={InputMaskPatterns.Tel}
                    disabled={updateInfoMut.isLoading}
                    {...field}
                  >
                    <Input
                      label="Номер телефона"
                      type="tel"
                      leadingIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 -960 960 960"
                          width="24"
                        >
                          <path d="M798-120q-129 0-251.5-57.5t-217-152q-94.5-94.5-152-217T120-798q0-18 12-30t30-12h162q14 0 25 9t13 23l26 140q2 14-.5 25.5T376-622l-97 98q42 72 105.5 135T524-280l94-94q9-9 23.5-13.5T670-390l138 28q14 3 23 13.5t9 24.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                        </svg>
                      }
                      validError={errors.tel?.message}
                    />
                  </InputMask>
                )}
              />
            </Form.Group>
            <Form.Group>
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
                    validError={errors.login?.message}
                    disabled={updateInfoMut.isLoading}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                rules={{
                  validate(value) {
                    if (value.length !== 0 && !validateEmail(value))
                      return "Невалидный email-адрес!"
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Email"
                    type="email"
                    leadingIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                      </svg>
                    }
                    validError={errors.email?.message}
                    disabled={updateInfoMut.isLoading}
                    {...field}
                  />
                )}
              />
            </Form.Group>
            <Form.Group>
              <Controller
                control={control}
                name="oldPassword"
                rules={{
                  validate(value) {
                    if (value.length === 0 && getValues("newPassword"))
                      return "Заполните старый пароль, чтобы сменить на новый!"
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Введите старый пароль"
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
                    validError={errors.oldPassword?.message}
                    disabled={updateInfoMut.isLoading}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="newPassword"
                rules={{
                  validate(value) {
                    if (value.length === 0 && getValues("oldPassword"))
                      return "Придумайте новый пароль!"

                    if (value.length !== 0) {
                      if (value.length < 8)
                        return "Пароль должен быть не менее 8 символов!"

                      if (!new RegExp(/[A-ZА-ЯЁ]/, "g").test(value))
                        return "Пароль должен содержать не менее одной заглавной буквы!"
                    }
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Введите новый пароль"
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
                    validError={errors.newPassword?.message}
                    disabled={updateInfoMut.isLoading}
                    {...field}
                  />
                )}
              />
            </Form.Group>
          </Form.Inputs>

          <Form.Actions>
            <Button
              type="submit"
              variant="elevated"
              title="Сохранить изменения"
              disabled={updateInfoMut.isLoading}
            >
              Сохранить изменения
            </Button>
          </Form.Actions>
        </Form.Root>
      </Section.Content>
    </Section.Root>
  )
}

export default EdiInfoForm
