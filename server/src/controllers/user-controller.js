import { exception } from '../utils/helper.js'
import User from '../models/user-model.js'

export const findById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) next(exception(404, 'User not found'))

    const { password, ...userPublic } = user._doc
    return res.status(200).json(userPublic)
  } catch (error) {
    next(error)
  }
}

export const remove = async (req, res, next) => {
  try {
    if (!req.userId !== req.params.id)
      return next(exception(403, 'User dant has permition'))
    await User.findByIdAndDelete(req.params.id)
    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
