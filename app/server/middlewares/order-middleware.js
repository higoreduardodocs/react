import { Joi } from 'express-validation'

export const updateStatusValidation = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    status: Joi.string().required(),
  }),
}

export const getByAdministratorValidation = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

export const getByCustomerValidation = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}
