import { RouterPaths } from "@/utils/enums"
import { useNavigate } from "@solidjs/router"
import { getCookieObject } from "utils"
import { CookieKeys } from "utils/enums"
import type { AuthCookie } from "utils/types"

export const useAuthProtect = () => {
  const navigate = useNavigate()
  const authCookie = getCookieObject<AuthCookie>(CookieKeys.AuthToken)

  if (!authCookie) navigate(RouterPaths.SignInPage, { replace: true })
}