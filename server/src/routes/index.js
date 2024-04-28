const express = require('express')

const userRoutes = require('./user-route')

const brandRoutes = require('./brand-route')
const categoryRoutes = require('./category-route')
const colorRoutes = require('./color-route')
const sizeRoutes = require('./size-route')
const productRoutes = require('./product-route')

const couponRoutes = require('./coupon-route')
const orderRoutes = require('./order-route')

const router = express.Router()

router.use('/users', userRoutes)

router.use('/brands', brandRoutes)
router.use('/categories', categoryRoutes)
router.use('/colors', colorRoutes)
router.use('/sizes', sizeRoutes)
router.use('/products', productRoutes)

router.use('/coupons', couponRoutes)
router.use('/orders', orderRoutes)

module.exports = router
