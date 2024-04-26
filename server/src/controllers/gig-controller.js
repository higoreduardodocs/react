import { exception } from '../utils/helper.js'
import Gig from '../models/gig-model.js'
import Review from '../models/review-model.js'
import Order from '../models/order-model.js'

export const create = async (req, res, next) => {
  try {
    if (!req.isSeller) return next(exception(403, 'User not authorizated'))

    const gig = await Gig.create({
      userId: req.userId,
      ...req.body,
    })
    return res.status(201).json(gig)
  } catch (error) {
    next(error)
  }
}

export const remove = async (req, res, next) => {
  try {
    if (!req.isSeller) return next(exception(403, 'User not authorizated'))
    const gig = await Gig.findById(req.params.id)
    if (!gig) return next(exception(404, 'Not found'))
    if (gig.userId.toString() !== req.userId)
      return next(exception(403, 'User not authorizated'))

    await Gig.findByIdAndDelete(req.params.id)
    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

export const findById = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id)
    if (!gig) return next(exception(404, 'Not found'))

    return res.status(200).json(gig)
  } catch (error) {
    next(error)
  }
}

export const findAll = async (req, res, next) => {
  const query = req.query
  const filter = {
    ...(query.userId && { userId: query.userId }),
    ...(query.category && {
      category: { $regex: query.category, $options: 'i' },
    }),
    ...((query.min || query.max) && {
      price: {
        ...(query.min && { $gt: query.min }),
        ...(query.max && { $lt: query.max }),
      },
    }),
    ...(query.search && {
      $or: [
        { title: { $regex: query.search, $options: 'i' } },
        { shortTitle: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
        { shortDescription: { $regex: query.search, $options: 'i' } },
      ],
    }),
  }

  try {
    const gigs = await Gig.find(filter).sort({ [query.sort]: -1 })
    return res.status(200).json(gigs)
  } catch (error) {
    next(error)
  }
}

export const findAllReviewsById = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.id })
    return res.status(200).json(reviews)
  } catch (error) {
    next(error)
  }
}

export const createReview = async (req, res, next) => {
  try {
    if (req.isSeller) return next(exception(400, 'Seller dont create reviews'))
    const orders = await Order.find({
      gigId: req.params.id,
      buyerId: req.userId,
    })
    if (!orders) return next(exception(403, 'User not has buyer'))

    const review = await Review.findOne({
      gigId: req.params.id,
      userId: req.userId,
    })
    if (review)
      next(exception(403, 'You have already created a review for this gig!'))

    const _review = await Review.create({
      gigId: req.params.id,
      userId: req.userId,
      star: req.body.star,
      description: req.body.description,
    })
    await Gig.findByIdAndUpdate(req.params.id, {
      $inc: { starAmount: req.body.star, starNumber: 1 },
    })
    return res.status(201).json(_review)
  } catch (error) {
    next(error)
  }
}

export const removeReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({
      gigId: req.params.id,
      userId: req.userId,
    })
    if (!review) next(exception(404, 'Not found'))

    await Review.findByIdAndDelete(review._id)
    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

export const findAllOrdersByUser = async (req, res, next) => {
  try {
    const orders = await Order.find({
      gigId: req.params.id,
      buyerId: req.userId,
    })
    return res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
}
