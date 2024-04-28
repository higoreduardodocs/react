const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const Category = require('../models/category-model')

const save = asyncHandler(async (req, res, next) => {
  try {
    const category = await Category.create({
      ...req.body,
      slug: slugify(req.body.name).toLowerCase(),
    })
    res.status(201).json(category)
  } catch (error) {
    next(error)
  }
})

const update = asyncHandler(async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(req.body.name && { slug: slugify(req.body.name).toLowerCase() }),
      },
      { new: true }
    )
    res.json(updatedCategory)
  } catch (error) {
    next(error)
  }
})

const remove = asyncHandler(async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

const findById = asyncHandler(async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

const findAll = asyncHandler(async (req, res, next) => {
  try {
    const categories = await Category.find({})
    res.status(200).json(categories)
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
