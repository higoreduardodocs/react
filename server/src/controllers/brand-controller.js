const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const Brand = require('../models/brand-model')

const save = asyncHandler(async (req, res, next) => {
  try {
    const slug = slugify(req.body.name.toLowerCase())
    const createdBrand = await Brand.create({ ...req.body, slug })
    res.status(201).json(createdBrand)
  } catch (error) {
    next(error)
  }
})

const update = asyncHandler(async (req, res, next) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(req.body.name && { slug: slugify(req.body.name).toLowerCase() }),
      },
      {
        new: true,
      }
    )
    res.status(200).json(updatedBrand)
  } catch (error) {
    next(error)
  }
})

const remove = asyncHandler(async (req, res, next) => {
  try {
    await Brand.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

const findById = asyncHandler(async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id)
    res.status(200).json(brand)
  } catch (error) {
    next(error)
  }
})

const findAll = asyncHandler(async (req, res, next) => {
  try {
    const brands = await Brand.find()
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
