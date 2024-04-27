import { Joi } from 'express-validation'

export const registerValidation = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
}

export const updateValidation = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
  }),
}

export const getBySlugValidation = {
  params: Joi.object({
    slug: Joi.string().required(),
  }),
}

export const removeValidation = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

export const getProductsValidation = {
  params: Joi.object({
    slug: Joi.string().required(),
  }),
}
