import express from 'express'
import { validate } from 'express-validation'

import * as authMiddleware from '../middlewares/auth-middleware.js'
import * as categoryMiddleware from '../middlewares/category-middleware.js'
import * as categoryController from '../controllers/category-controller.js'

const router = express.Router()
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

router.post(
  '/register',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  validate(categoryMiddleware.registerValidation),
  use(categoryController.register)
)
router.put(
  '/:id',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  validate(categoryMiddleware.updateValidation),
  use(categoryController.update)
)
router.get('/', use(categoryController.getAll))
router.get(
  '/:slug/products',
  validate(categoryMiddleware.getProductsValidation),
  use(categoryController.getProducts)
)
router.get(
  '/:slug',
  validate(categoryMiddleware.getBySlugValidation),
  use(categoryController.getBySlug)
)
router.delete(
  '/:id',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  validate(categoryMiddleware.removeValidation),
  use(categoryController.remove)
)

export default router
