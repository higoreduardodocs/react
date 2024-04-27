import { Joi } from 'express-validation'

export const registerValidation = {
  body: Joi.object({
    category: Joi.string().alphanum().length(24).required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    shipping: Joi.bool().optional(),
    photo: Joi.object({}).optional(),
  }),
}

export const updatedValidation = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    category: Joi.string().alphanum().length(24).optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
    quantity: Joi.number().optional(),
    shipping: Joi.bool().optional(),
    photo: Joi.object({}).optional(),
  }),
}

export const getByIdValidation = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

export const getPhotoByIdValidation = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

export const removeValidation = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

export const filterProductsValidation = {
  body: Joi.object({
    categories: Joi.array()
      .items(Joi.string().alphanum().length(24))
      .optional(),
    priceRange: Joi.array().items(Joi.number()).optional(),
  }),
}

export const listPerPageValidation = {
  params: Joi.object({
    page: Joi.number().required(),
  }),
}

export const searchValidation = {
  params: Joi.object({
    search: Joi.string().required(),
  }),
}

export const relatedValidation = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
    category: Joi.string().alphanum().length(24).required(),
  }),
}
