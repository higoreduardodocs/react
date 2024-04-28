const { Joi } = require('express-validation')

const save = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
}

const update = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    name: Joi.string().optional(),
  }),
}

const remove = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

module.exports = { save, update, remove }
