import 'dotenv/config'
import app from "./app"

const PORT = process.env.API_PORT || 9000

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}!`)
})

