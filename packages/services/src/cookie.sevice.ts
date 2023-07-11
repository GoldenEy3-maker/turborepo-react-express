import Cookies from "js-cookie"

export default new class CookieService {
  getCookieObject<T = unknown>(key: string) {
    let cookie = Cookies.get(key)

    if (!cookie) return undefined

    if (cookie.startsWith("j:")) {
      cookie = cookie.slice(cookie.indexOf(":") + 1)
    }

    return JSON.parse(cookie) as T
  }
}