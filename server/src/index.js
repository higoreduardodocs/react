require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const ws = require('ws')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user-route')

/* CONST */
const serverPort = process.env.SERVER_PORT || 3001
const clientUrl = process.env.CLIENT_URL
const mongoUrl = process.env.MONGO_URL
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const app = express()

app.use(express.json())
app.use(cookieParser())
app.disable('x-powered-by')
app.use(
  cors({
    credentials: true,
    origin: clientUrl,
  })
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', clientUrl)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
  )
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
  )

  next()
})

/* ROUTES */
app.use('/api/v1/users', userRoutes)

/* LISTEN */
mongoose
  .connect(mongoUrl, mongoOptions)
  .then(() => console.log(`✅ conneted to mongo`))
  .catch((err) => console.log(`${err} ❌ did not connect`))

const server = app.listen(serverPort, () => {
  console.log(`🚀 running on: http://localhost:${serverPort}`)
})
const wss = new ws.WebSocketServer({ server })
