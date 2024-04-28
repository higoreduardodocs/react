const asyncHandler = require('express-async-handler')

const Size = require('../models/size-model')

const save = asyncHandler(async (req, res, next) => {
  try {
    const createdSize = await Size.create(req.body)
    res.status(201).json(createdSize)
  } catch (error) {
    next(error)
  }
})

const update = asyncHandler(async (req, res, next) => {
  try {
    const updatedSize = await Size.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updatedSize)
  } catch (error) {
    next(error)
  }
})

const remove = asyncHandler(async (req, res, next) => {
  try {
    await Size.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

const findById = asyncHandler(async (req, res, next) => {
  try {
    const brand = await Size.findById(req.params.id)
    res.status(200).json(brand)
  } catch (error) {
    next(error)
  }
})

const findAll = asyncHandler(async (req, res, next) => {
  try {
    const brands = await Size.find({})
    res.status(200).json(brands)
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
