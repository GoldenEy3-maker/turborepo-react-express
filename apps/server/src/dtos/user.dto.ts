import { Role, User } from "@prisma/client"

export type UserModel = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "tokenVersion"
>

export default class UserDto {
  email: string
  password: string
  firstName: string
  lastName: string
  middleName: string | null
  tel: string | null
  role: Role
  birthDate: Date

  constructor(model: UserModel) {
    this.email = model.email
    this.password = model.password
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.middleName = model.middleName
    this.tel = model.tel
    this.role = model.role
    this.birthDate = model.birthDate
  }
}
