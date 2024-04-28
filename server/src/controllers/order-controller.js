const asyncHandler = require('express-async-handler')

const Order = require('../models/order-model')
const User = require('../models/user-model')
const Product = require('../models/product-model')
const Coupon = require('../models/coupon-model')

const save = asyncHandler(async (req, res, next) => {
  try {
    const findUser = await User.findById(req.userId)
    if (!findUser) throw new Error('Usuário não cadastrado')

    const products = await Promise.all(
      req.body.cart.map(async (item) => {
        const productCart = {
          _id: item._id,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          price: await Product.findById(item._id).select('price'),
        }
        return productCart
      })
    )
    // for (const product of req.body.cart) {
    //   const productCart = {
    //     _id: product._id,
    //     quantity: product.quantity,
    //     color: product.color,
    //     size: product.size,
    //     price: await Product.findById(product._id).select("price"),
    //   };
    //   products.push(productCart);
    // }

    let cartAmount = products.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    )

    if (req.body.coupon) {
      const coupon = await Coupon.findOne({
        _id: req.body.coupon,
        expiry: { $gte: new Date() },
      })
      const userCouponCount = findUser.coupons?.filter(
        (item) => item === coupon._id.toString()
      ).length

      if (
        coupon &&
        coupon.quantityCount < coupon.quantityMax &&
        userCouponCount < coupon.quantityPerUser
      )
        cartAmount *= 1 - coupon.discount / 100
    }

    const createdOrder = await Order.create({
      products,
      shipping: req.body.shipping,
      amount: cartAmount.toFixed(2),
      paymentIntent: req.body.paymentIntent,
      orderBy: req.userId,
    })
    const productQueryUpdate = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { stock: -item.quantity, sold: +item.quantity } },
        },
      }
    })
    await Product.bulkWrite(productQueryUpdate, {})

    res.status(201).json(createdOrder)
  } catch (error) {
    next(error)
  }
})

const applyCoupon = asyncHandler(async (req, res, next) => {
  try {
    const findUser = await User.findById(req.userId)
    if (!findUser) throw new Error('Usuário não cadastrado')
    const findCoupon = await Coupon.findOne({
      _id: req.body.coupon,
      expiry: { $gte: new Date() },
    })
    if (!findCoupon) throw new Error('Cupom inválido')
    if (findCoupon.quantityCount >= findCoupon.quantityMax)
      throw new Error('Limite atingido')

    const userCouponCount = findUser.coupons?.filter(
      (item) => item === findCoupon._id.toString()
    ).length
    if (userCouponCount >= findCoupon.quantityPerUser)
      throw new Error('Limite atingido')

    return res.status(200).json(findCoupon)
  } catch (error) {
    next(error)
  }
})

const findByIdCustomer = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      orderBy: req.userId,
    }).populate('products.product')
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
})

const findById = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id }).populate(
      'products.product'
    )
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
})

const findAllByCustomer = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({ orderby: req.userId })
    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
})

const findAll = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({})
    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
})

const update = asyncHandler(async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.status },
      { new: true }
    )
    res.status(200).json(updatedOrder)
  } catch (error) {
    throw new Error(error)
  }
})

const remove = asyncHandler(async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = {
  save,
  applyCoupon,
  findByIdCustomer,
  findAllByCustomer,
  findById,
  findAll,
  update,
  remove,
}
