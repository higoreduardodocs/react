import { exception } from '../utils/helper.js'
import Conversation from '../models/conversation-model.js'

export const create = async (req, res, next) => {
  try {
    const conversation = await Conversation.create({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      sellerName: req.body.sellerName,
      buyerName: req.body.buyerName,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    })
    return res.status(201).json(conversation)
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    )
    return res.status(200).json(conversation)
  } catch (error) {
    next(error)
  }
}

export const findAll = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 })
    return res.status(200).json(conversations)
  } catch (error) {
    next(error)
  }
}

export const findByIds = async (req, res, next) => {
  try {
    const sellerConversation = await Conversation.findOne({
      id: req.body.sellerId + req.body.buyerId,
    })
    const buyerConversation = await Conversation.findOne({
      id: req.body.buyerId + req.body.sellerId,
    })
    const conversation = sellerConversation || buyerConversation
    if (!conversation) return next(exception(404, 'Not found'))

    return res.status(200).json(conversation)
  } catch (error) {
    next(error)
  }
}
