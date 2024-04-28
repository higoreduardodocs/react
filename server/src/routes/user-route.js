const express = require('express')
const { validate } = require('express-validation')

const userMiddleware = require('../middlewares/user-middleware')
const authMiddleware = require('../middlewares/auth-middleware')
const userController = require('../controllers/user-controller')

const router = express.Router()

router.post('/', validate(userMiddleware.save), userController.save)
router.post('/login', validate(userMiddleware.login), userController.login)
router.get(
  '/refresh-token',
  authMiddleware.auth,
  validate(userMiddleware.handleRefreshToken),
  userController.handleRefreshToken
)
router.get('/logout', userController.logout)

router.put(
  '/:id',
  authMiddleware.auth,
  validate(userMiddleware.update),
  userController.update
)
router.put(
  '/:id/update-password',
  authMiddleware.auth,
  validate(userMiddleware.updatePassword),
  userController.updatePassword
)
router.post(
  '/forgot-password-token',
  validate(userMiddleware.forgotPasswordToken),
  userController.forgotPasswordToken
)
router.post(
  '/reset-password',
  validate(userMiddleware.resetPassword),
  userController.resetPassword
)

router.get(
  '/:id',
  authMiddleware.auth,
  validate(userMiddleware.findById),
  userController.findById
)
router.get(
  '/',
  authMiddleware.auth,
  authMiddleware.admin,
  userController.findAll
)
router.delete(
  '/:id',
  authMiddleware.auth,
  validate(userMiddleware.remove),
  userController.remove
)
router.delete(
  '/:id/block',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(userMiddleware.blockById),
  userController.blockById
)
router.put(
  '/:id/unblock',
  authMiddleware.auth,
  authMiddleware.admin,
  validate(userMiddleware.unblockById),
  userController.unblockById
)

module.exports = router
