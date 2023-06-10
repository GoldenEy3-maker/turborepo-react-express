import type { ValueOf } from "utils/types"

export const RouterPaths = {
  HomePage: "/",
  SignInPage: "/signin",
  SignUpPage: "/signup",
} as const

export const InputMaskPatterns = {
  Tel: "+7 (999) 999-99-99",
  Date: "99.99.9999"
} as const

export const PageQueryKeys = {
  SignUp: {
    Tab: "tab"
  }
} as const

export type RouterPaths = ValueOf<typeof RouterPaths>

export type InputMaskPatters = ValueOf<typeof InputMaskPatterns>
