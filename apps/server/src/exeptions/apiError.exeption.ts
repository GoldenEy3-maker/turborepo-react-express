import { TRPCError } from "@trpc/server"

export type TRPCErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "TIMEOUT"
  | "CONFLICT"
  | "PRECONDITION_FAILED"
  | "PAYLOAD_TOO_LARGE"
  | "PARSE_ERROR"
  | "METHOD_NOT_SUPPORTED"
  | "UNPROCESSABLE_CONTENT"
  | "TOO_MANY_REQUESTS"
  | "CLIENT_CLOSED_REQUEST"
  | "INTERNAL_SERVER_ERROR"

export default class ApiError extends TRPCError {
  constructor(code: TRPCErrorCode, message?: string) {
    super({ code, message })
  }

  static Unauthorized(message?: string) {
    return new ApiError(
      "UNAUTHORIZED",
      message ?? "Неавторизованный пользователь!"
    )
  }

  static BadRequest(message: string) {
    return new ApiError("BAD_REQUEST", message)
  }

  static ServerError(message: string) {
    return new ApiError("INTERNAL_SERVER_ERROR", message)
  }

  static EnvNotFound() {
    return ApiError.ServerError("Отсутствуют важные системные переменные!")
  }
}
