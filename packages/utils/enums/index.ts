import { ValueOf } from '../types'

export const CookieKeys = {
  AuthToken: "auth_token"
} as const

export type CookieKeys = ValueOf<typeof CookieKeys>