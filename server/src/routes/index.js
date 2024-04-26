import express from 'express'

import authRoutes from './auth-route.js'
import userRoutes from './user-route.js'
import gigRoutes from './gig-route.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/gigs', gigRoutes)

export default router
