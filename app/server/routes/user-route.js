import express from 'express'
import { validate } from 'express-validation'

import * as authMiddleware from '../middlewares/auth-middleware.js'
import * as userMiddleware from '../middlewares/user-middleware.js'
import * as userController from '../controllers/user-controller.js'

const router = express.Router()
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

router.get(
  '/',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  use(userController.getAll)
)
router.post(
  '/register',
  validate(userMiddleware.registerValidation),
  use(userController.register)
)
router.post(
  '/login',
  validate(userMiddleware.loginValidation),
  use(userController.login)
)
router.put(
  '/',
  use(authMiddleware.requireSignIn),
  validate(userMiddleware.updateValidation),
  userController.update
)
router.put(
  '/reset-password',
  validate(userMiddleware.resetPasswordValidation),
  use(userController.resetPassowrd)
)
router.put(
  '/change-password',
  use(authMiddleware.requireSignIn),
  validate(userMiddleware.changePasswordValidation),
  use(userController.changePassword)
)
router.delete(
  '/:id',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  validate(userMiddleware.removeValidation),
  use(userController.remove)
)
router.get(
  '/admin-validate',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  (req, res) => {
    return res.status(200).json(true)
  }
)
router.get('/user-validate', use(authMiddleware.requireSignIn), (req, res) => {
  return res.status(200).json(true)
})

export default router
