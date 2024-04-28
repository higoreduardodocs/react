const asynHandler = require('express-async-handler')

const Coupon = require('../models/coupon-model')

const save = asynHandler(async (req, res, next) => {
  try {
    const coupon = await Coupon.create(req.body)
    res.status(201).json(coupon)
  } catch (error) {
    next(error)
  }
})

const update = asynHandler(async (req, res, next) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedCoupon)
  } catch (error) {
    next(error)
  }
})

const remove = asynHandler(async (req, res, next) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

const findById = asynHandler(async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id)
    res.status(200).json(coupon)
  } catch (error) {
    next(error)
  }
})

const findAll = asynHandler(async (req, res, next) => {
  try {
    const coupons = await Coupon.find({})
    res.json(coupons)
  } catch (error) {
    next(error)
  }
})

module.exports = {
  save,
  update,
  remove,
  findById,
  findAll,
}
