import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { exception } from '../utils/helper.js'
import User from '../models/user-model.js'

export const create = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 5)
    const createdUser = await User.create({
      ...req.body,
      password: hashedPassword,
    })
    const { password, ...createdPublicUser } = createdUser._doc
    return res.status(201).json({ user: createdPublicUser })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const logedUser = await User.findOne({ username: req.body.username })
    if (!logedUser) return next(exception(404, 'User not found'))

    const matchPassword = bcrypt.compareSync(
      req.body.password,
      logedUser.password
    )
    if (!matchPassword)
      return next(exception(400, 'Wrong username or password'))

    const token = jwt.sign(
      { id: logedUser._id, isSeller: logedUser.isSeller },
      process.env.JWT_SECRET
    )
    const { password, ...logedPublicUser } = logedUser._doc
    return res
      .cookie('accessToken', token, { httpOnly: true })
      .status(200)
      .json({ user: logedPublicUser })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res) => {
  return res
    .cookie('accessToken', { sameSite: 'none', secure: true })
    .status(200)
    .json('User has logouted')
}
