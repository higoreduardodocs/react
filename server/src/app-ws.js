const ws = require('ws')

const messageController = require('./controllers/message-controller')

const onError = (ws, err) => {
  console.error(`onError: ${err.message}`)
}

const onMessage = (wss, ws, req, data) => {
  // console.log(`onMessage: ${data}`)
  messageController.createMessage(wss, ws, req, data)
}

const onConnection = (wss, ws, req) => {
  // ws.send('hello ws')
  // console.log('onConnection')
  ws.on('message', (data) => onMessage(wss, ws, req, data))
  ws.on('error', (error) => onError(ws, error))
}

// console.log([...wss.clients].map(item => item.username))
const notifyAboutOnlinePeople = (wss) =>
  [...wss.clients].forEach((item) => {
    item.send(
      JSON.stringify({
        online: [...wss.clients].map((i) => ({
          userId: i.userId,
          username: i.username,
        })),
      })
    )
  })

module.exports = (server, serverPort) => {
  const wss = new ws.WebSocketServer({ server })
  const notify = () => notifyAboutOnlinePeople(wss)

  wss.on('connection', (ws, req) => {
    messageController.getUserDataFromRequest(ws, req)
    onConnection(wss, ws, req)

    messageController.userDisconneted(ws, req, notify)
    notify()
  })
  console.log(`🔥 wss running on: ws://localhost:${serverPort}`)
  return wss
}
