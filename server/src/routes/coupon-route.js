const express = require('express')
const { validate } = require('express-validation')

const authMiddleware = require('../middlewares/auth-middleware')
const couponMiddleware = require('../middlewares/coupon-middleware')
const couponController = require('../controllers/coupon-controller')

const router = express.Router()

router.post(
  '/',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(couponMiddleware.save),
  couponController.save
)
router.put(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(couponMiddleware.update),
  couponController.update
)
router.delete(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(couponMiddleware.remove),
  couponController.remove
)
router.get('/:id', couponController.findById)
router.get('/', couponController.findAll)

module.exports = router
