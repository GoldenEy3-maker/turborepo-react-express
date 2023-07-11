import { User } from "@prisma/client"

export type AuthCookie = { token: string } & User
