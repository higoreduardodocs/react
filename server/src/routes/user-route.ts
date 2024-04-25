import { Router } from 'express'

import { UserController } from '../controllers/user-controller'

class UserRoute {
  private router: Router
  private userController: UserController

  constructor() {
    this.router = Router()
    this.userController = new UserController()
  }

  getRoutes() {
    this.router.post('/', this.userController.save.bind(this.userController))
    this.router.post(
      '/auth',
      this.userController.auth.bind(this.userController)
    )

    return this.router
  }
}

export { UserRoute }
