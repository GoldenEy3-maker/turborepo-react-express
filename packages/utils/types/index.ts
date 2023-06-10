import { User } from "@prisma/client"

export type AuthCookie = { token: string } & User

export type ValueOf<T> = T[keyof T]