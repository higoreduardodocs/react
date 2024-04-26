import express from 'express'

import authRoutes from './auth-route.js'
import userRoutes from './user-route.js'
import gigRoutes from './gig-route.js'
import orderRoutes from './order-route.js'
import conversationRoutes from './conversation-route.js'
import messageRoutes from './message-route.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/gigs', gigRoutes)
router.use('/orders', orderRoutes)
router.use('/conversations', conversationRoutes)
router.use('/messages', messageRoutes)

export default router
