require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const ws = require('ws')

/* CONST */
const serverPort = process.env.SERVER_PORT || 3001
const clientUrl = process.env.CLIENT_URL

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

app.get('/', (req, res) => res.send({ message: 'ok' }))

/* LISTEN */
const server = app.listen(serverPort, () => {
  console.log(`🚀 running on: http://localhost:${serverPort}`)
})
const wss = new ws.WebSocketServer({ server })
