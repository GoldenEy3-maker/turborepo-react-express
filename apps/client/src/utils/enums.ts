import type { ValueOf } from "utils/types/helper"

export const RouterPaths = {
  HomePage: "/",
  SignInPage: "/sign-in",
  SignUpPage: "/sign-up",
  ProfilePage: "/profile",
  OrdersPage: "/orders",
  FavoritesPage: "/favorites",
  ActivateAccountPage: "/activate",
} as const

export const InputMaskPatterns = {
  Tel: "+7 (999) 999-99-99",
  Date: "9999-99-99",
} as const

export const QueryKeys = {
  SignUp: {
    Tab: "tab",
  },
} as const

export type RouterPaths = ValueOf<typeof RouterPaths>

export type InputMaskPatters = ValueOf<typeof InputMaskPatterns>
