import { useNavigate } from "@solidjs/router"
import Cookies from "js-cookie"

export const withAuthProtect = () => {
  const navigate = useNavigate()
  const authToken = Cookies.get("auth_token")

  if (!authToken) navigate("/auth", { replace: true })
}

export const setDynamicClass = ({
  statics,
  dynamics,
  conditions,
}: {
  statics: (string | undefined)[]
  dynamics: string[][]
  conditions: boolean[]
}) => {
  const classes = statics.filter((cls) => cls !== undefined)

  for (let i = 0;i < conditions.length;i++) {
    if (conditions[i]) {
      dynamics[i].forEach((internalDnClass) => classes.push(internalDnClass))
    }
  }

  return classes.join(" ")
}

export const setStaticClass = (...classes: (string | undefined)[]) => {
  return classes.filter((cls) => cls !== undefined).join(" ")
}
