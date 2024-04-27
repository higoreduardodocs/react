import slugify from 'slugify'

import Category from '../models/category-model.js'
import Product from '../models/product-model.js'

export const register = async (req, res) => {
  const { name } = req.body

  const existingCategory = await Category.findOne({ name })
  if (existingCategory) throw new Error('Category Already Exist')

  const category = await new Category({
    name,
    slug: slugify(name),
  }).save()
  return res.status(201).json(category)
}

export const update = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const existingCategory = await Category.findOne({ name })
  if (existingCategory) throw new Error('Category Already Exist')

  const categoryUpdated = await Category.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  )
  return res.status(200).json(categoryUpdated)
}

export const getAll = async (req, res) => {
  const categories = await Category.find({})
  return res.status(200).json(categories)
}

export const getBySlug = async (req, res) => {
  const { slug } = req.params

  const category = await Category.findOne({ slug })
  if (!category) throw new Error('Category Not Exist')

  return res.status(200).json(category)
}

export const remove = async (req, res) => {
  const { id } = req.params

  const category = await Category.findByIdAndDelete(id)
  return res.status(200).json(category)
}

export const getProducts = async (req, res) => {
  const { slug } = req.params
  const category = await Category.findOne({ slug })
  if (!category) throw new Error('Category Not Found')

  const products = await Product.find({ category: category._id })
    .select('-photo')
    .populate('category')
  return res.status(200).json(products)
}
