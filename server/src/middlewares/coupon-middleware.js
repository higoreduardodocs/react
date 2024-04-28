const { Joi } = require('express-validation')

const save = {
  body: Joi.object({
    name: Joi.string().required(),
    expiry: Joi.date().required(),
    discount: Joi.number().required(),
    quantityMax: Joi.number().required(),
    quantityPerUser: Joi.number().optional(),
  }),
}

const update = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    name: Joi.string().optional(),
    expiry: Joi.date().optional(),
    discount: Joi.number().optional(),
    quantityMax: Joi.number().optional(),
    quantityPerUser: Joi.number().optional(),
  }),
}

const remove = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

module.exports = { save, update, remove }
