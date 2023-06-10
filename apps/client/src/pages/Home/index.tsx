import { RouterPaths } from "@/utils/enums"
import { A } from "@solidjs/router"
import { type Component } from "solid-js"

const HomePage: Component = () => {
  return (
    <main class="home">
      <h2 style={{ "font-size": "var(--headline-m-fs)" }}>Главная страница</h2>
      <div>
        <A href={RouterPaths.SignInPage}>Авторизация</A>
        <hr />
        <A href={RouterPaths.SignUpPage}>Регистрация</A>
      </div>
    </main>
  )
}

export default HomePage
