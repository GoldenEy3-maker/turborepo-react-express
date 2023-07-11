import { ValueOf } from "../types/helper"

export const CookieKeys = {
  RefreshToken: "jid",
} as const

export type CookieKeys = ValueOf<typeof CookieKeys>
