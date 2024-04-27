import jwt from 'jsonwebtoken'

import { hashPassword, comparePassword } from '../helpers/index.js'
import User from '../models/user-model.js'

export const getAll = async (req, res) => {
  const id = req.user._id
  const users = await User.find({ _id: { $ne: id } })
  return res.status(200).json(users)
}

export const register = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body

  const exisitingUser = await User.findOne({ email })
  if (exisitingUser) throw new Error('Email already register')

  const hashedPassword = await hashPassword(password)
  const user = await new User({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    role,
  }).save()

  return res.status(201).json(user)
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) throw new Error('Email is not registered')

  const match = await comparePassword(password, user.password)
  if (!match) throw new Error('Invalid password')

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
  return res.status(200).json({ user, token })
}

export const update = async (req, res) => {
  const { name, password, phone, address } = req.body

  const user = await User.findById(req.user._id)
  if (!user) throw new Error('User is not registered')

  const hashedPassword = password ? await hashPassword(password) : undefined
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: name || user.name,
      password: hashedPassword || user.password,
      phone: phone || user.phone,
      address: address || user.address,
    },
    { new: true }
  )
  return res.status(200).json(updatedUser)
}

export const resetPassowrd = async (req, res) => {
  const { email, newPassword } = req.body

  const user = await User.findOne({ email })
  if (!user) throw new Error('User is not registered')

  const hashed = await hashPassword(newPassword)
  await User.findByIdAndUpdate(user._id, { password: hashed })
  return res.status(200).json(user)
}

export const changePassword = async (req, res) => {
  const { password, newPassword } = req.body

  const user = await User.findById(req.user._id)
  if (!user) throw new Error('User is not registered')

  const match = await comparePassword(password, user.password)
  if (!match) throw new Error('Invalid password')

  const hashed = await hashPassword(newPassword)
  await User.findByIdAndUpdate(user._id, { password: hashed })
  return res.status(200).json(user)
}

export const remove = async (req, res) => {
  const { id } = req.params

  const userDeleted = await User.findByIdAndDelete(id)
  return res.status(200).json(userDeleted)
}
