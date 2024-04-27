import braintree from 'braintree'
import dotenv from 'dotenv'

import Order from '../models/order-model.js'

dotenv.config()

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.PAYMENT_MERCHANT_ID,
  publicKey: process.env.PAYMENT_PUBLIC_KEY,
  privateKey: process.env.PAYMENT_PRIVATE_KEY,
})

export const generatePaymentToken = async (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) throw new Error('Request failed, try again')

    return res.status(200).json(response.clientToken)
  })
}

export const paymentCheckout = async (req, res) => {
  const { nonce, cart } = req.body

  const amount = cart.reduce(
    (acc, cur) => acc + cur.price * cur.cartQuantity,
    0
  )
  let payment
  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) throw new Error('Payment failed, try again')
      payment = result
    }
  )

  const order = await new Order({
    products: cart,
    payment: payment,
    customer: req.user._id,
    payload: cart,
  }).save()
  return res.status(200).json(order)
}

export const getAllByAdministrator = async (req, res) => {
  const orders = await Order.find({})
    .populate('customer', 'name')
    .sort({ createdAt: '-1' })
  return res.status(200).json(orders)
}

export const getAllByCustomer = async (req, res) => {
  const orders = await Order.find({ customer: req.user._id })
  return res.status(200).json(orders)
}

export const getByAdministrator = async (req, res) => {
  const { id } = req.params

  const order = await Order.findById(id).populate(
    'customer',
    'name address phone'
  )
  return res.status(200).json(order)
}

export const getByCustomer = async (req, res) => {
  const { id } = req.params

  const order = await Order.findOne({
    _id: id,
    customer: req.user._id,
  }).populate('products', '-photo')
  return res.status(200).json(order)
}

export const updateStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
  res.status(200).json(order)
}
