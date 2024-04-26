import Message from '../models/message-model.js'
import Conversation from '../models/conversation-model.js'

export const create = async (req, res, next) => {
  try {
    const message = await Message.create({
      conversationId: req.body.conversationId,
      userId: req.userId,
      image: req.body.image,
      description: req.body.description,
    })
    await Conversation.findByIdAndUpdate(
      req.body.conversationId,
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.description,
        },
      },
      { new: true }
    )
    return res.status(201).json(message)
  } catch (error) {
    next(error)
  }
}

export const findAll = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })
    await Conversation.findOneAndUpdate(
      { _id: req.params.conversationId },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    )
    return res.status(200).json(messages)
  } catch (error) {
    next(error)
  }
}
