const jwt = require('jsonwebtoken')

const User = require('../models/user-model')

const auth = async (req, res, next) => {
  try {
    if (!req.cookies?.refreshToken) throw new Error('Usuário não autenticado')

    jwt.verify(
      req.cookies.refreshToken,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) throw new Error('Dados inválidos')

        req.userId = decoded.id
        next()
      }
    )
  } catch (error) {
    next(error)
  }
}

const admin = async (req, res, next) => {
  try {
    const findUser = await User.findById(req.userId)
    if (findUser.role !== 'admin') throw new Error('Usuário não autorizado')

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { auth, admin }
