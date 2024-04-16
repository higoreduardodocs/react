const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

exports.getUserDataFromRequest = async (req) => {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.token

    if (token) {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) reject('Token malformated')

        resolve(userData)
      })
    } else {
      reject('No token provide')
    }
  })
}
