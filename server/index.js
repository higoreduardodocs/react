import { fileURLToPath } from 'url' /* Manager to file URL */
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import mongoose from 'mongoose'

import { verifyToken } from './src/middlewares/auth-validation.js'
import { signUp } from './src/controllers/auth-controller.js'
import { createPost } from './src/controllers/post-controller.js'
import authRoutes from './src/routes/auth-route.js'
import userRoutes from './src/routes/user-route.js'
import postRoutes from './src/routes/post-route.js'

/* SEED DB */
// import User from './src/models/user-model.js'
// import Post from './src/models/post-model.js'
// import { users, posts } from './src/data/index.js'

/* CONFIGURATIONS */
dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(
  '/src/public/assets',
  express.static(path.join(__dirname, '/src/public/assets'))
)

const PORT = process.env.SERVER_PORT || 3001
const MONGO_URL = process.env.MONGO_URL

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

/* ROUTES WITH FILES */
app.post('/auth/sign-up', upload.single('picture'), signUp)
app.post('/posts', verifyToken, upload.single('picture'), createPost)

/* ROUTES */
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

/* MONGOOSE SETUP */
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on: http://localhost:${PORT}`)
    )

    /* SEED DB */
    // User.insertMany(users)
    // Post.insertMany(posts)
  })
  .catch((err) => console.log(`${err} did not connect`))
