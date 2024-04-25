import { Router } from 'express'

import { ScheduleController } from '../controllers/schedule-controller'
import { AuthMiddleware } from '../middlewares/auth-middleware'

class ScheduleRoute {
  private router: Router
  private scheduleController: ScheduleController
  private authMiddleware: AuthMiddleware

  constructor() {
    this.router = Router()
    this.scheduleController = new ScheduleController()
    this.authMiddleware = new AuthMiddleware()
  }

  getRoutes() {
    this.router.post(
      '/',
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.scheduleController.save.bind(this.scheduleController)
    )
    this.router.get(
      '/',
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.scheduleController.findAllByDate.bind(this.scheduleController)
    )
    this.router.put(
      '/:id',
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.scheduleController.updateById.bind(this.scheduleController)
    )
    this.router.delete(
      '/',
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.scheduleController.removeByDate.bind(this.scheduleController)
    )

    return this.router
  }
}

export { ScheduleRoute }
