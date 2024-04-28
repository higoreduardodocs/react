const { Joi } = require('express-validation')

const save = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    address: Joi.object({
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      number: Joi.string().optional(),
      zipCode: Joi.number().optional(),
    }).required(),
  }),
}

const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

const handleRefreshToken = {
  cookies: Joi.object({
    refreshToken: Joi.string().required(),
  }),
}

const update = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    mobile: Joi.string().optional(),
    address: Joi.object({
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      number: Joi.string().optional(),
      zipCode: Joi.number().optional(),
    }).optional(),
  }),
}

const updatePassword = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    newPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

const forgotPasswordToken = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
}

const resetPassword = {
  body: Joi.object({
    token: Joi.string().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

const findById = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

const remove = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

const blockById = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

const unblockById = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
}

module.exports = {
  save,
  login,
  handleRefreshToken,
  update,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  findById,
  remove,
  blockById,
  unblockById,
}
