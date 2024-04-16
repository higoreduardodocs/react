require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const userRoutes = require('./routes/user-route')

/* CONST */
const clientUrl = process.env.CLIENT_URL

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(morgan('dev'))
app.disable('x-powered-by')
app.use(
  cors({
    credentials: true,
    origin: clientUrl || '*',
  })
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', clientUrl || '*')
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

module.exports = app
