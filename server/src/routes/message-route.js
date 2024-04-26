import express from 'express'

import { verifyToken } from '../middlewares/jwt.js'
import { create, findAll } from '../controllers/message-controller.js'

const router = express.Router()

router.post('/', verifyToken, create)
router.get('/conversation/:conversationId', verifyToken, findAll)

export default router
