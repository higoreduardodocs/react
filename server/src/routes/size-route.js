const express = require('express')
const { validate } = require('express-validation')

const authMiddleware = require('../middlewares/auth-middleware')
const sizeMiddleware = require('../middlewares/size-middleware')
const sizeController = require('../controllers/size-controller')

const router = express.Router()

router.post(
  '/',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(sizeMiddleware.save),
  sizeController.save
)
router.put(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(sizeMiddleware.update),
  sizeController.update
)
router.delete(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(sizeMiddleware.remove),
  sizeController.remove
)
router.get('/:id', sizeController.findById)
router.get('/', sizeController.findAll)

module.exports = router
