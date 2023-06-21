import { QueryClientProvider } from "@tanstack/react-query"
import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useTrpcClient } from "./hooks/trpcClient"
import { RouterPaths } from "./utils/enums"
import { trpc } from "./utils/trpc"
import Toastify from "@/components/Toastify"

const MainLayout = lazy(() => import("./layouts/Main"))
const AuthLayout = lazy(() => import("./layouts/Auth"))
const HomePage = lazy(() => import("./pages/Home"))
const ProfilePage = lazy(() => import("./pages/Profile"))
const SignInPage = lazy(() => import("./pages/SignIn"))
const SignUpPage = lazy(() => import("./pages/SignUp"))

const App = () => {
  const { trpcClient, queryClient } = useTrpcClient()

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="wrapper">
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route
                  path={RouterPaths.ProfilePage}
                  element={<ProfilePage />}
                />
              </Route>
              <Route element={<AuthLayout />}>
                <Route path={RouterPaths.SignInPage} element={<SignInPage />} />
                <Route path={RouterPaths.SignUpPage} element={<SignUpPage />} />
              </Route>
            </Routes>
          </div>
          <Toastify />
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App