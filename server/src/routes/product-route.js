const express = require('express')
const { validate } = require('express-validation')

const authMiddleware = require('../middlewares/auth-middleware')
const productMiddleware = require('../middlewares/product-middleware')
const productController = require('../controllers/product-controller')

const router = express.Router()

router.post(
  '/',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(productMiddleware.save),
  productController.save
)
router.put(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(productMiddleware.update),
  productController.update
)
router.delete(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(productMiddleware.remove),
  productController.remove
)
router.get('/:id', productController.findById)
router.get("/", productController.findAll);
router.put(
  '/:id/wishlist-toggle',
  authMiddleware.auth,
  validate(productMiddleware.wishlistToggle),
  productController.wishlistToggle
)
router.post(
  '/:id/review',
  authMiddleware.auth,
  validate(productMiddleware.review),
  productController.review
)

module.exports = router
