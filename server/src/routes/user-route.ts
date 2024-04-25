import { Router } from 'express'

import { UserController } from '../controllers/user-controller'
import { AuthMiddleware } from '../middlewares/auth-middleware'
import storage from '../config/multer'

class UserRoute {
  private router: Router
  private userController: UserController
  private authMiddleware: AuthMiddleware

  constructor() {
    this.router = Router()
    this.userController = new UserController()
    this.authMiddleware = new AuthMiddleware()
  }

  getRoutes() {
    this.router.post('/', this.userController.save.bind(this.userController))
    this.router.post(
      '/auth',
      this.userController.auth.bind(this.userController)
    )
    this.router.put(
      '/',
      this.authMiddleware.auth.bind(this.authMiddleware),
      storage.single('avatar_url'),
      this.userController.update.bind(this.userController)
    )

    return this.router
  }
}

export { UserRoute }
