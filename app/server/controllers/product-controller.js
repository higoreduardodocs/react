import slugify from 'slugify'
import fs from 'fs'

import Product from '../models/product-model.js'

export const register = async (req, res) => {
  console.log('register')
  const { name } = req.fields
  const photo = req.files?.photo

  const product = new Product({ ...req.fields, slug: slugify(name) })
  if (photo) {
    product.photo.data = fs.readFileSync(photo.path)
    product.photo.contentType = photo.type
  }
  await product.save()
  return res.status(201).json(product)
}

export const update = async (req, res) => {
  const { id } = req.params
  const { name } = req.fields
  const photo = req.files?.photo

  const product = await Product.findById(id)
  if (!product) throw new Error('Product Not Exist')

  const productUpdated = await Product.findByIdAndUpdate(
    id,
    { ...req.fields, slug: slugify(name) },
    { new: true }
  )
  if (photo) {
    productUpdated.photo.data = fs.readFileSync(photo.path)
    productUpdated.photo.contentType = photo.type
    await productUpdated.save()
  }
  return res.status(200).json(productUpdated)
}

export const getAll = async (req, res) => {
  const products = await Product.find({})
    .populate('category')
    .select('-photo')
    .limit(6)
    .sort({ createdAt: -1 })
  return res.status(200).json(products)
}

export const getById = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
    .select('-photo')
    .populate('category')

  if (!product) throw new Error('Product Not Found')
  return res.status(200).json(product)
}

export const getPhotoById = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id).select('photo')

  if (!product.photo.data) return res.sendStatus(204)

  res.set('Content-type', product.photo.contentType)
  return res.status(200).send(product.photo.data)
}

export const remove = async (req, res) => {
  const { id } = req.params

  const product = await Product.findByIdAndDelete(id).select('-photo')
  return res.status(200).json(product)
}

export const filterProducts = async (req, res) => {
  const { categories, priceRange } = req.body

  let args = {}
  if (categories?.length > 0) args.category = categories
  if (priceRange?.length > 0)
    args.price = { $gte: priceRange[0], $lte: priceRange[1] }
  const products = await Product.find(args).select('-photo')
  return res.status(200).json(products)
}

export const countProducts = async (req, res) => {
  const amount = await Product.find({}).estimatedDocumentCount()
  return res.status(200).json(amount)
}

export const listPerPage = async (req, res) => {
  const page = req.params?.page || 1
  const perPage = 6
  const products = await Product.find({})
    .populate('category')
    .select('-photo')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ createdAt: -1 })
  return res.status(200).json(products)
}

export const search = async (req, res) => {
  const { search } = req.params
  const products = await Product.find({
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ],
  }).select('-photo')
  return res.status(200).json(products)
}

export const related = async (req, res) => {
  const { id, category } = req.params
  const products = await Product.find({
    _id: { $ne: id },
    category,
  })
    .select('-photo')
    .limit(4)
    .populate('category')
  return res.status(200).json(products)
}
