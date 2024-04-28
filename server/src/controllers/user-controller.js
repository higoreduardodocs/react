const uniqid = require('uniqid')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('../models/user-model')
const Product = require('../models/product-model')
const { generateToken, generateRefreshToken } = require('../config/jwt')
const sendEmail = require('../helpers/email')

const save = asyncHandler(async (req, res, next) => {
  try {
    const findUser = await User.findOne({ email: req.body.email })
    if (findUser) throw new Error('Usuário já cadastrado')

    const createdUser = await User.create(req.body)
    res.status(201).json(createdUser.sendAuthUser())
  } catch (error) {
    next(error)
  }
})

const login = asyncHandler(async (req, res, next) => {
  try {
    const findUser = await User.findOne({ email: req.body.email })
    if (!findUser) throw new Error('Usuário não cadastrado')
    if (!(await findUser.isPasswordMatched(req.body.password)))
      throw new Error('Dados inválidos')

    const refreshToken = generateRefreshToken(findUser._id)
    const updatedUser = await User.findByIdAndUpdate(
      findUser._id,
      { refreshToken },
      { new: true }
    )

    return res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        user: updatedUser.sendAuthUser(),
        token: generateToken(findUser._id),
      })
  } catch (error) {
    next(error)
  }
})

const handleRefreshToken = asyncHandler(async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      refreshToken: req.cookies.refreshToken,
    })
    if (!findUser) throw new Error('Dados inválidos')

    jwt.verify(
      req.cookies.refreshToken,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err || findUser._id.toString() !== decoded.id) {
          throw new Error('Dados inválidos')
        }

        const refreshToken = generateRefreshToken(findUser._id)
        const updatedUser = await User.findByIdAndUpdate(
          findUser._id,
          { refreshToken },
          { new: true }
        )
        return res
          .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
          })
          .status(200)
          .json({
            user: updatedUser.sendAuthUser(),
            refreshToken,
          })
      }
    )
  } catch (error) {
    next(error)
  }
})

const logout = asyncHandler(async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      refreshToken: req.cookies.refreshToken,
    })
    if (!findUser) {
      return res
        .clearCookie('refreshToken', {
          httpOnly: true,
          secure: true,
        })
        .sendStatus(204)
    }

    await User.findOneAndUpdate(
      { refreshToken: req.cookies.refreshToken },
      { refreshToken: '' },
      { new: true }
    )

    return res
      .clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
      })
      .sendStatus(204)
  } catch (error) {
    next(error)
  }
})

const update = asyncHandler(async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) throw new Error('Usuário não autorizado')
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updatedUser.sendAuthUser())
  } catch (error) {
    next(error)
  }
})

const updatePassword = asyncHandler(async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) throw new Error('Usuário não autorizado')
    const findUser = await User.findById(req.params.id)
    if (!findUser) throw new Error('Usuário não cadastrado')
    if (!(await findUser.isPasswordMatched(req.body.password)))
      throw new Error('Dados inválidos')

    findUser.password = req.body.newPassword
    const updatedUser = await findUser.save()
    return res.status(200).json(updatedUser.sendAuthUser())
  } catch (error) {
    next(error)
  }
})

const forgotPasswordToken = asyncHandler(async (req, res, next) => {
  try {
    const findUser = await User.findOne({ email: req.body.email })
    if (!findUser) throw new Error('Usuário não cadastrado')

    const token = findUser.createPasswordResetToken()
    await findUser.save()

    const resetURL = `
      Acesse o link para redefinir sua senha. Este link tem um período de validade de 10 minutos
      à partir de agora. <a href='http://localhost:3003/api/users/reset-password/${token}'>Redefinir senha<a/>`
    const data = {
      from: 'naoresponder@devstore.com',
      to: findUser.email,
      text: `Olá, ${findUser.name}!`,
      subject: 'Redefinir senha',
      html: resetURL,
    }

    sendEmail(data, (message) => {
      return res.status(200).json(message)
    })
  } catch (error) {
    next(error)
  }
})

const resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.body.token)
      .digest('hex')
    const findUser = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })
    if (!findUser) throw new Error('Usuário não cadastrado')

    findUser.password = req.body.password
    findUser.passwordResetToken = undefined
    findUser.passwordResetExpires = undefined
    await findUser.save()
    return res.status(200).json(findUser.sendAuthUser())
  } catch (error) {
    next(error)
  }
})

const findById = asyncHandler(async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) throw new Error('Usuário não autorizado')
    const user = await User.findById(req.params.id)
    res.status(200).json(user.sendAuthUser())
  } catch (error) {
    next(error)
  }
})

const findAll = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } })
    const findedUsers = await Promise.all(
      users.map(async (item) => item.sendAuthUser())
    )
    res.status(200).json(findedUsers)
  } catch (error) {
    next(error)
  }
})

const findAllWislist = asyncHandler(async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) throw new Error('Usuário não autorizado')
    const findUser = await User.findById(req.params.id).populate('wishlist')
    res.status(200).json(findUser)
  } catch (error) {
    next(error)
  }
})

const remove = asyncHandler(async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) throw new Error('Usuário não autorizado')
    await User.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

const blockById = asyncHandler(async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    )
    res.status(200).json(updatedUser.sendAuthUser())
  } catch (error) {
    next(error)
  }
})

const unblockById = asyncHandler(async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    )
    res.status(200).json(updatedUser.sendAuthUser())
  } catch (error) {
    next(error)
  }
})

const saveCart = asyncHandler(async (req, res, next) => {
  try {
    const findUser = await User.findById(req.user.id)
    if (!findUser) throw new Error('Usuário não cadastrado')

    const products = []
    for (const product in req.body.cart) {
      const productCart = {
        _id: product._id,
        quantity: product.quantity,
        color: product.color,
        size: product.size,
        price: await Product.findById(product._id).select('price').exec(),
      }
      products.push(productCart)
    }
    const cartAmount = products.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    )

    await User.findByIdAndUpdate(req.params.id, {
      $push: { cart: { products, amount: cartAmount, createdAt: new Date() } },
    })
    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

const offerCart = asyncHandler(async (req, res, next) => {
  try {
    // Send email
    // Empty cart
  } catch (error) {
    next(error)
  }
})

module.exports = {
  save,
  login,
  handleRefreshToken,
  logout,
  update,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  findById,
  findAll,
  findAllWislist,
  remove,
  blockById,
  unblockById,
  saveCart,
  offerCart,
}
