const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { getUserDataFromRequest } = require('../utils/helper')
const UserModel = require('../models/user-model')
const MessageModel = require('../models/message-model')

const jwtSecret = process.env.JWT_SECRET
const bcryptSalt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT))

exports.signUp = async (req, res) => {
  const { username, password } = req.body

  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
    const createdUser = await UserModel.create({
      username,
      password: hashedPassword,
    })
    jwt.sign(
      { userId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) return res.status(500).json(err)

        return res
          .cookie('token', token, { sameSite: 'none', secure: true })
          .status(201)
          .json({ id: createdUser._id })
      }
    )
  } catch (err) {
    return res.status(500).json('Error')
  }
}

exports.signIn = async (req, res) => {
  const { username, password } = req.body

  try {
    const foundedUser = await UserModel.findOne({ username })
    if (!foundedUser) return res.status(422).json('User not found')

    const isCheckPassword = bcrypt.compareSync(password, foundedUser.password)
    if (!isCheckPassword) return res.status(401).json('Credentials wrong')

    jwt.sign(
      { userId: foundedUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) return res.status(500).json(err)

        return res
          .cookie('token', token, { sameSite: 'none', secure: true })
          .status(200)
          .json({ id: foundedUser._id })
      }
    )
  } catch (err) {
    return res.status(500).json('Error')
  }
}

exports.profile = (req, res) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json('No token provide')
  }

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) res.status(401).json('Token malformated')

    return res.json(userData)
  })
}

exports.logout = (req, res) => {
  return res
    .cookie('token', '', { sameSite: 'none', secure: true })
    .status(200)
    .json('Disconnected')
}

exports.people = async (req, res) => {
  const users = await UserModel.find({}, { _id: 1, username: 1 })
  return res.status(200).json(users)
}

exports.messages = async (req, res) => {
  const { userId } = req.params
  const userData = await getUserDataFromRequest(req)
  const ourUserId = userData.userId

  const messages = await MessageModel.find({
    sender: { $in: [userId, ourUserId] },
    recipient: { $in: [userId, ourUserId] },
  }).sort({ createdAt: 1 })

  res.status(200).json(messages)
}
