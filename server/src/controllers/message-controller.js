const jwt = require('jsonwebtoken')
const fs = require('fs')
const { join } = require('path')

const MessageModel = require('../models/message-model')

const jwtSecret = process.env.JWT_SECRET

exports.getUserDataFromRequest = (ws, req) => {
  const cookies = req.headers.cookie
  if (cookies) {
    const tokenCookieString = cookies
      .split(';')
      .find((str) => str.startsWith('token='))
    if (tokenCookieString) {
      const token = tokenCookieString.split('=')[1]
      if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if (err) ws.send('Token malformated')

          const { userId, username } = userData
          ws.userId = userId
          ws.username = username
        })
      }
    }
  } else {
    ws.send('No token provide')
  }
}

exports.userDisconneted = (ws, req, notifyAboutOnlinePeople) => {
  ws.isAlive = true
  ws.timer = setInterval(() => {
    ws.ping()
    ws.deathTimer = setTimeout(() => {
      ws.isAlive = false
      ws.terminate()
      clearInterval(ws.timer)
      notifyAboutOnlinePeople()
      // console.log('dead')
    }, 1000)
  }, 5000)
  ws.on('pong', () => {
    // console.log('pong')
    clearTimeout(ws.deathTimer)
  })
}

exports.createMessage = async (wss, ws, req, message) => {
  const messageData = JSON.parse(message.toString())
  const { recipient, text, file } = messageData

  let filename = null

  if (file) {
    // console.log(file)
    console.log('size: ' + file.data.length)
    const parts = file.name.split('.')
    const ext = parts[parts.length - 1]
    filename = Date.now() + '.' + ext
    const path = join(__dirname, '../uploads/' + filename)
    const bufferData = new Buffer(file.data.split(',')[1], 'base64')

    fs.writeFile(path, bufferData, () => {
      console.log('saved file in: ' + path)
    })
  }

  if (recipient && (text || file)) {
    const messageDoc = await MessageModel.create({
      sender: ws.userId,
      recipient,
      text,
      file: filename,
    })

    const clients = [...wss.clients]
    clients
      .filter((item) => item.userId === recipient)
      .forEach((item) =>
        item.send(
          JSON.stringify({
            text,
            sender: ws.userId,
            recipient,
            file: filename,
            _id: messageDoc._id,
          })
        )
      )
  }
}
