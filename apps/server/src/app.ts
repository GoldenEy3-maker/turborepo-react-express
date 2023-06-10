import { createExpressMiddleware } from "@trpc/server/adapters/express"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from "express"
import fileUpload from "express-fileupload"
import { createContext } from './context'
import { appRouter } from "./router"


const app = express()

app.use(cors({
  // origin: "https://solid-express-client.vercel.app",
  origin: process.env.CLIENT_ORIGIN_URL ?? "http://localhost:3000",
  credentials: true,
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())


app.use("/api", createExpressMiddleware({
  router: appRouter,
  createContext,
  batching: {
    enabled: true
  }
}))


export default app