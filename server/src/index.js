require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')

const dbConnect = require('./config/mongo')
const errorHandler = require('./middlewares/error-middleware')
const routes = require('./routes')

dbConnect()
const app = express()
const PORT = process.env.SERVER_PORT || 3002

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api', routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`)
})
