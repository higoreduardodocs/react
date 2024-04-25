import { v4 as uuid } from 'uuid'
import multer from 'multer'
import path from 'path'

const storage = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join(__dirname, '../public'))
    },
    filename: (req, file, callback) => {
      const picturePath =
        file.fieldname + '-' + uuid() + path.extname(file.originalname)
      req.body.picturePath = picturePath
      callback(null, picturePath)
    },
  }),
  limits: { fieldSize: 1 * 1024 * 1024 },
})

export default storage

// const picturePath =
//   file.fieldname + "-" + Date.now() + path.extname(file.originalname);
