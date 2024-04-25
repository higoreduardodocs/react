import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user-model.js'

export const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    })
    const savedUser = await newUser.save()

    return res.status(201).json(savedUser)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) res.status(400).json({ msg: 'User does not exist.' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) res.status(400).json({ msg: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.SERVER_SECRET)
    delete user.password

    return res.status(200).json({ user, token })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
