import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'
const SERVER_PORT = process.env.SERVER_PORT || 3001

const app = express()
app.disable('x-powered-by')
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  return res.status(200).json({ msg: 'Hello' })
})

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong'

  return res.status(errorStatus).json(errorMessage)
})

app.listen(SERVER_PORT || 3001, () => {
  console.log(`Server Running on http://localhost:${SERVER_PORT}`)
})
