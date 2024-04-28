const express = require('express')
const { validate } = require('express-validation')

const authMiddleware = require('../middlewares/auth-middleware')
const colorMiddleware = require('../middlewares/color-middleware')
const colorController = require('../controllers/color-controller')

const router = express.Router()

router.post(
  '/',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(colorMiddleware.save),
  colorController.save
)
router.put(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(colorMiddleware.update),
  colorController.update
)
router.delete(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(colorMiddleware.remove),
  colorController.remove
)
router.get('/:id', colorController.findById)
router.get('/', colorController.findAll)

module.exports = router
