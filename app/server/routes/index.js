import express from 'express'

import userRoutes from './user-route.js'
import categoryRoutes from './category-route.js'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)

export default router
