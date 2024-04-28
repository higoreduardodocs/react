const { Joi } = require('express-validation')

const save = {
  body: Joi.object({
    cart: Joi.array()
      .items(
        Joi.object({
          _id: Joi.string().alphanum().length(24).required(),
          quantity: Joi.number().required(),
          color: Joi.string().alphanum().length(24).required(),
          size: Joi.string().alphanum().length(24).required(),
        })
      )
      .required(),
    shipping: Joi.number().required(),
    paymentIntent: Joi.string().alphanum().length(24).required(),
    coupon: Joi.string().alphanum().length(24).optional(),
  }),
}

const applyCoupon = {
  body: Joi.object({
    coupon: Joi.string().alphanum().length(24).required(),
  }),
}

const update = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    status: Joi.string().required(),
  }),
}

module.exports = { save, applyCoupon, update }
