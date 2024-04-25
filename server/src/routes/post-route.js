import express from 'express'

import { verifyToken } from '../middlewares/auth-validation.js'
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from '../controllers/post-controller.js'

const router = express.Router()

router.get('/', verifyToken, getFeedPosts)
router.get('/:userId', verifyToken, getUserPosts)
router.patch('/:id/like', verifyToken, likePost)

export default router
