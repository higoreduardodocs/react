const { Joi } = require('express-validation')

const save = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().alphanum().length(24).required(),
    brand: Joi.string().alphanum().length(24).required(),
    price: Joi.number().required(),
    offer: Joi.number().optional(),
    stock: Joi.number().required(),
    stockOffer: Joi.number().optional(),
    offerCreatedAt: Joi.date().optional(),
    offerDeadlineAt: Joi.date().optional(),
    cover: Joi.object({
      public_id: Joi.string().required(),
      url: Joi.string().required(),
    }).required(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string().required(),
          url: Joi.string().required(),
        })
      )
      .required(),
    sizes: Joi.array().items(Joi.string().alphanum().length(24)).required(),
    colors: Joi.array().items(Joi.string().alphanum().length(24)).required(),
    tags: Joi.array().items(Joi.string()).optional(),
  }),
}

const update = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    category: Joi.string().alphanum().length(24).optional(),
    brand: Joi.string().alphanum().length(24).optional(),
    price: Joi.number().optional(),
    offer: Joi.number().optional(),
    stock: Joi.number().optional(),
    stockOffer: Joi.number().optional(),
    offerCreatedAt: Joi.date().optional(),
    offerDeadlineAt: Joi.date().optional(),
    cover: Joi.object({
      public_id: Joi.string().required(),
      url: Joi.string().required(),
    }).optional(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string().required(),
          url: Joi.string().required(),
        })
      )
      .optional(),
    sizes: Joi.array().items(Joi.string().alphanum().length(24)).optional(),
    colors: Joi.array().items(Joi.string().alphanum().length(24)).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
  }),
}

const remove = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

const wishlistToggle = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

const review = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    stars: Joi.number().required(),
    description: Joi.string().optional(),
  }),
}

module.exports = { save, update, remove, wishlistToggle, review }
