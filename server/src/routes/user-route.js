import express from 'express'

import { findById, remove } from '../controllers/user-controller.js'
import { verifyToken } from '../middlewares/jwt.js'

const router = express.Router()

router.get('/:id', findById)
router.delete('/:id', verifyToken, remove)

export default router
