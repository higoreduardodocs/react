import Stripe from 'stripe'

import { exception } from '../utils/helper.js'
import Order from '../models/order-model.js'
import Gig from '../models/gig-model.js'
import User from '../models/user-model.js'

export const makePayment = async (req, res, next) => {
  try {
    if (res.isSeller) next(exception(400, 'Sellers dont has buyer'))
    const stripe = new Stripe(process.env.PAYMENT_STRIPE_PRIVATE_KEY)
    const gig = await Gig.findById(req.body.gigId)

    if (req.userId === gig.userId)
      return next(exception(400, 'Seller dont buy your gig'))

    const seller = await User.findById(gig.userId)
    const buyer = await User.findById(req.userId)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    })

    await Order.create({
      gigId: gig._id,
      sellerId: gig.userId,
      buyerId: req.userId,
      sellerName: seller.username,
      buyerName: buyer.username,
      image: gig.cover,
      title: gig.title,
      price: gig.price,
      payment_intent: paymentIntent.id,
    })

    return res.status(201).json(paymentIntent.client_secret)
  } catch (error) {
    next(error)
  }
}

export const confirmPayment = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
        buyerId: req.userId,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    )
    await Gig.findByIdAndUpdate(
      order.gigId,
      { $inc: { sales: 1 } },
      { new: true }
    )
    return res.status(200).json(order)
  } catch (error) {
    next(error)
  }
}

export const findAll = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    })
    return res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
}
