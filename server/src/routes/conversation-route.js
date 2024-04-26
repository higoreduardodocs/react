import express from 'express'

import { verifyToken } from '../middlewares/jwt.js'
import {
  create,
  findAll,
  findByIds,
  update,
} from '../controllers/conversation-controller.js'

const router = express.Router()

router.post('/', verifyToken, create)
router.put('/:id', verifyToken, update)
router.get('/', verifyToken, findAll)
router.post('/messages', verifyToken, findByIds)

export default router
