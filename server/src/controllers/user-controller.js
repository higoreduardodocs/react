import User from '../models/user-model.js'

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select('-password')

    return res.status(200).json(user)
  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params
    const user = await User.findById(id)
    const friend = await User.findById(friendId)

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((item) => item !== friendId)
      friend.friends = friend.friends.filter((item) => item !== id)
    } else {
      user.friends.push(friendId)
      friend.friends.push(id)
    }

    await user.save()
    await friend.save()

    const friends = await Promise.all(
      user.friends.map((item) => User.findById(item))
    )
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath }
      }
    )

    return res.status(200).json(formattedFriends)
  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    const friends = await Promise.all(
      user.friends.map((item) => User.findById(item))
    )
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath }
      }
    )

    return res.status(200).json(formattedFriends)
  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}
