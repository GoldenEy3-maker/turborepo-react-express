import { QueryClientProvider } from "@tanstack/react-query"
import { lazy } from "react"
import { Route, Routes } from "react-router-dom"
import { SkeletonThemeProvider } from "./components/SkeletonTheme"
import ToastContainer from "./components/ToastContainer"
import { useTrpcClient } from "./hooks/trpcClient.hook"
import { RouterPaths } from "./utils/enums"
import { trpc } from "./utils/trpc"

const MainLayout = lazy(() => import("./layouts/Main"))
const AuthLayout = lazy(() => import("./layouts/Auth"))
const HomePage = lazy(() => import("./pages/Home"))
const ProfilePage = lazy(() => import("./pages/Profile"))
const SignInPage = lazy(() => import("./pages/SignIn"))
const SignUpPage = lazy(() => import("./pages/SignUp"))
const OrdersPage = lazy(() => import("./pages/Orders"))
const OrderPage = lazy(() => import("./pages/Order"))
const ActivateAccountPage = lazy(() => import("./pages/ActiveAccount"))

const App = () => {
  const { trpcClient, queryClient } = useTrpcClient()

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SkeletonThemeProvider>
          <div className="wrapper">
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route
                  path={RouterPaths.ProfilePage}
                  element={<ProfilePage />}
                />
                <Route path={RouterPaths.OrdersPage} element={<OrdersPage />} />
                <Route
                  path={RouterPaths.OrdersPage + "/:orderId"}
                  element={<OrderPage />}
                />
              </Route>
              <Route element={<AuthLayout />}>
                <Route path={RouterPaths.SignInPage} element={<SignInPage />} />
                <Route path={RouterPaths.SignUpPage} element={<SignUpPage />} />
                <Route
                  path={RouterPaths.ActivateAccountPage}
                  element={<ActivateAccountPage />}
                />
              </Route>
            </Routes>
          </div>
          <ToastContainer />
        </SkeletonThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
