import Post from '../models/post-model.js'
import User from '../models/user-model.js'

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body
    const user = await User.findById(userId)
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    })
    await newPost.save()

    const posts = await Post.find()

    return res.status(201).json(posts)
  } catch (err) {
    return res.status(409).json({ error: err.message })
  }
}

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()

    return res.status(200).json(posts)
  } catch (err) {
    return res.status(409).json({ error: err.message })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)

    if (!user) return res.status(409).json({ msg: 'User does not exist.' })

    const posts = await Post.find({ userId: userId })

    return res.status(200).json(posts)
  } catch (err) {
    return res.status(409).json({ error: err.message })
  }
}

export const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)

    if (isLiked) post.likes.delete(userId)
    else post.likes.set(userId, true)

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )

    return res.status(200).json(updatedPost)
  } catch (err) {
    return res.status(409).json({ error: err.message })
  }
}
