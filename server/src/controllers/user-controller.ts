import { NextFunction, Request, Response } from 'express'

import { UserService } from '../services/user-service'

class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async save(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body

    try {
      const user = await this.userService.save({ name, email, password })
      return res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  async auth(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    try {
      const user = await this.userService.auth(email, password)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

export { UserController }
