import jwt from 'jsonwebtoken'

import User, { Role } from '../models/user-model.js'

export const requireSignIn = async (req, res, next) => {
  if (!req.headers.authorization) throw new Error('No token provider')

  const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
  req.user = decode
  next()
}

export const requireAdministrator = async (req, res, next) => {
  const user = await User.findById(req.user._id)
  if (user.role !== Role.Administrator) throw new Error('Unauthorized access')

  next()
}
