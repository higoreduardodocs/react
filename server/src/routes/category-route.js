const express = require('express')
const { validate } = require('express-validation')

const authMiddleware = require('../middlewares/auth-middleware')
const categoryMiddleware = require('../middlewares/category-middleware')
const categoryController = require('../controllers/category-controller')

const router = express.Router()

router.post(
  '/',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(categoryMiddleware.save),
  categoryController.save
)
router.put(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(categoryMiddleware.update),
  categoryController.update
)
router.delete(
  '/:id',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(categoryMiddleware.remove),
  categoryController.remove
)
router.get('/:id', categoryController.findById)
router.get('/', categoryController.findAll)

module.exports = router
