const Router = require('express').Router

const userController = require('../controllers/user-controller')

const router = Router()

router.post('/sign-up', userController.signUp)
router.post('/sign-in', userController.signIn)
router.get('/profile', userController.profile)
router.get('/logout', userController.logout)
router.get('/people', userController.people)
router.get('/:id/messages', userController.messages)

module.exports = router
