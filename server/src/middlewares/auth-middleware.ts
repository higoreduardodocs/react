import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

class AuthMiddleware {
  auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader)
      return res
        .status(401)
        .json({ code: 'token.missing', message: 'Token no provider' })

    const [_, token] = authHeader.split(' ')
    try {
      if (!process.env.ACCESS_KEY_TOKEN) throw new Error('No secret provide')

      const { sub } = verify(token, process.env.ACCESS_KEY_TOKEN) as IPayload
      req.user_id = sub
      next()
    } catch (error) {
      return res.status(401).json({
        code: 'token.expired',
        message: 'Token expired',
      })
    }
  }
}

export { AuthMiddleware }
