import { validate } from 'express-validation'
import express from 'express'
import formidable from 'express-formidable'

import * as authMiddleware from '../middlewares/auth-middleware.js'
import * as productMiddleware from '../middlewares/product-middleware.js'
import * as productController from '../controllers/product-controller.js'

const router = express.Router()
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

router.post(
  '/register',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  validate(productMiddleware.registerValidation),
  formidable(),
  use(productController.register)
)
router.put(
  '/:id',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  validate(productMiddleware.updatedValidation),
  formidable(),
  use(productController.update)
)
router.get('/', use(productController.getAll))
router.post(
  '/filter',
  validate(productMiddleware.filterProductsValidation),
  use(productController.filterProducts)
)
router.get('/count', use(productController.countProducts))
router.get(
  '/paginate/:page',
  validate(productMiddleware.listPerPageValidation),
  use(productController.listPerPage)
)
router.get(
  '/search/:search',
  validate(productMiddleware.searchValidation),
  use(productController.search)
)
router.get(
  '/:id/related/:category',
  validate(productMiddleware.relatedValidation),
  use(productController.related)
)
router.get(
  '/:id',
  validate(productMiddleware.getByIdValidation),
  use(productController.getById)
)
router.get(
  '/:id/photo',
  validate(productMiddleware.getPhotoByIdValidation),
  use(productController.getPhotoById)
)
router.delete(
  '/:id',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  validate(productMiddleware.removeValidation),
  use(productController.remove)
)

export default router
