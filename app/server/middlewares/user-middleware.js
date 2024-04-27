import { Joi } from 'express-validation'

export const registerValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    role: Joi.string().required(),
  }),
}

export const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

export const updateValidation = {
  body: Joi.object({
    name: Joi.string().optional(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
  }),
}

export const resetPasswordValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    newPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

export const changePasswordValidation = {
  body: Joi.object({
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    newPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

export const removeValidation = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}
