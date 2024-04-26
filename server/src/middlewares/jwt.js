import jwt from 'jsonwebtoken'

import { exception } from '../utils/helper.js'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken
  if (!token) return next(exception(401, 'User not authenticated'))

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return next(exception(403, 'Token invalid'))

    req.userId = payload.id
    req.isSeller = payload.isSeller
    next()
  })
}
