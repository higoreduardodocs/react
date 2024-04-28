const express = require('express')
const { validate } = require('express-validation')

const authMiddleware = require('../middlewares/auth-middleware')
const brandMiddleware = require('../middlewares/brand-middleware')
const brandController = require('../controllers/brand-controller')

const router = express.Router()

router.post(
  '/',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(brandMiddleware.save),
  brandController.save
)
router.put(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(brandMiddleware.update),
  brandController.update
)
router.delete(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(brandMiddleware.remove),
  brandController.remove
)
router.get('/:id', brandController.findById)
router.get('/', brandController.findAll)

module.exports = router
