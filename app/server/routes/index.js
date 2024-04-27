import express from 'express'

import userRoutes from './user-route.js'
import categoryRoutes from './category-route.js'
import productRoutes from './product-route.js'
import orderRoutes from './order-route.js'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)

export default router
