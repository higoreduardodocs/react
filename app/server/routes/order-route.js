import express from 'express'
import { validate } from 'express-validation'

import * as authMiddleware from '../middlewares/auth-middleware.js'
import * as orderMiddleware from '../middlewares/order-middleware.js'
import * as orderController from '../controllers/order-controller.js'

const router = express.Router()
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

router.get(
  '/generate-payment-token',
  use(authMiddleware.requireSignIn),
  use(orderController.generatePaymentToken)
)
router.post(
  '/payment-checkout',
  use(authMiddleware.requireSignIn),
  use(orderController.paymentCheckout)
)
router.get(
  '/administrator',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  use(orderController.getAllByAdministrator)
)
router.get(
  '/customer',
  use(authMiddleware.requireSignIn),
  use(orderController.getAllByCustomer)
)
router.get(
  '/administrator/:id',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  validate(orderMiddleware.getByAdministratorValidation),
  use(orderController.getByAdministrator)
)
router.get(
  '/customer/:id',
  use(authMiddleware.requireSignIn),
  validate(orderMiddleware.getByCustomerValidation),
  use(orderController.getByCustomer)
)
router.put(
  '/:id',
  use(authMiddleware.requireSignIn),
  use(authMiddleware.requireAdministrator),
  validate(orderMiddleware.updateStatusValidation),
  use(orderController.updateStatus)
)

export default router
