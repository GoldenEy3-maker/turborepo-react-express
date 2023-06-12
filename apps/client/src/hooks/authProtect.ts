import { RouterPaths } from "@/utils/enums"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { getCookieObject } from "utils"
import { CookieKeys } from "utils/enums"
import type { AuthCookie } from "utils/types"

export const useAuthProtect = () => {
  const navigate = useNavigate()
  const authCookie = getCookieObject<AuthCookie>(CookieKeys.AuthToken)

  useEffect(() => {
    if (!authCookie) navigate(RouterPaths.SignInPage, { replace: true })
  }, [authCookie, navigate])
}