const mongoose = require('mongoose')

const app = require('./app')
const appWs = require('./app-ws')

/* CONST */
const serverPort = process.env.SERVER_PORT || 3001
const mongoUrl = process.env.MONGO_URL
// const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

/* LISTEN */
mongoose
  .connect(mongoUrl)
  .then(() => console.log(`✅ conneted to mongo`))
  .catch((err) => console.log(`${err} ❌ did not connect`))

const server = app.listen(serverPort, () => {
  console.log(`🚀 server running on: http://localhost:${serverPort}`)
})
appWs(server, serverPort)
