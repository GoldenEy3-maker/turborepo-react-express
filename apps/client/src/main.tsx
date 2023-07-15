import ReactDOM from "react-dom/client"
import "react-loading-skeleton/dist/skeleton.css"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import "./styles/global.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
