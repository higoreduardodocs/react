const express = require('express')
const { validate } = require('express-validation')

const authMiddleware = require('../middlewares/auth-middleware')
const orderMiddleware = require('../middlewares/order-middleware')
const orderController = require('../controllers/order-controller')

const router = express.Router()

router.post(
  '/',
  authMiddleware.auth,
  validate(orderMiddleware.save),
  orderController.save
)
router.post(
  '/apply-coupon',
  authMiddleware.auth,
  validate(orderMiddleware.applyCoupon),
  orderController.applyCoupon
)
router.put(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(orderMiddleware.update),
  orderController.update
)
router.get(
  '/:id/customer',
  authMiddleware.auth,
  orderController.findByIdCustomer
)
router.get('/customer', authMiddleware.auth, orderController.findAllByCustomer)
router.get(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  orderController.findById
)
router.get(
  '/',
  authMiddleware.auth,
  authMiddleware.admin,
  orderController.findAll
)
router.delete(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  orderController.remove
)

module.exports = router
