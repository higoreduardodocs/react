import express from 'express'

import { verifyToken } from '../middlewares/jwt.js'
import {
  confirmPayment,
  findAll,
  makePayment,
} from '../controllers/order-controller.js'

const router = express.Router()

router.post('/make-payment', verifyToken, makePayment)
router.post('/confirm-payment', verifyToken, confirmPayment)
router.get('/', verifyToken, findAll)

export default router
