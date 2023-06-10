import { Route, Routes } from "@solidjs/router"
import type { Component } from "solid-js"
import { lazy } from "solid-js"
import { RouterPaths } from "./utils/enums"

const MainLayout = lazy(() => import("./layout/Main"))
const HomePage = lazy(() => import("./pages/Home"))
const AuthLayout = lazy(() => import("./layout/Auth"))
const SignInPage = lazy(() => import("./pages/SignIn"))
const SignUpPage = lazy(() => import("./pages/SignUp"))

const App: Component = () => {
  return (
    <div class="wrapper">
      <Routes>
        <Route path="*" component={MainLayout}>
          <Route path={RouterPaths.HomePage} component={HomePage} />
        </Route>
        <Route path="*" component={AuthLayout}>
          <Route path={RouterPaths.SignInPage} component={SignInPage} />
          <Route path={RouterPaths.SignUpPage} component={SignUpPage} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
