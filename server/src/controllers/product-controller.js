const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const Product = require('../models/product-model')
const User = require('../models/user-model')

const save = asyncHandler(async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name).toLowerCase()
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

const update = asyncHandler(async (req, res, next) => {
  try {
    if (req.body.name) req.body.slug = slugify(req.body.name).toLowerCase()
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
    res.status(200).json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

const remove = asyncHandler(async (req, res, next) => {
  try {
    await Product.findOneAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

const findById = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

// const findAll = asyncHandler(async (req, res, next) => {
//   try {
//     // Filtering
//     const queryObj = { ...req.query };
//     const excludeFields = ["page", "sort", "limit", "fields"];
//     excludeFields.forEach((el) => delete queryObj[el]);
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//     let query = Product.find(JSON.parse(queryStr));

//     // Sorting

//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // limiting the fields

//     if (req.query.fields) {
//       const fields = req.query.fields.split(",").join(" ");
//       query = query.select(fields);
//     } else {
//       query = query.select("-__v");
//     }

//     // pagination

//     const page = req.query.page;
//     const limit = req.query.limit;
//     const skip = (page - 1) * limit;
//     query = query.skip(skip).limit(limit);
//     if (req.query.page) {
//       const productCount = await Product.countDocuments();
//       if (skip >= productCount) throw new Error("This Page does not exists");
//     }
//     const product = await query;
//     res.json(product);
//   } catch (error) {
//     next(error);
//   }
// });

const wishlistToggle = asyncHandler(async (req, res, next) => {
  try {
    const findUser = await User.findById(req.userId)
    if (!findUser) throw new Error('Usuário não cadastrado')
    const findProduct = await Product.findById(req.params.id)
    if (!findProduct) throw new Error('Produto não cadastrado')

    const wishlistExisted = findUser.wishlist.find(
      (id) => id.toString() === req.params.id
    )

    let updatedUser
    if (wishlistExisted) {
      updatedUser = await User.findByIdAndUpdate(
        req.userId,
        { $pull: { wishlist: req.params.id } },
        { new: true }
      )
    } else {
      updatedUser = await User.findByIdAndUpdate(
        req.userId,
        { $push: { wishlist: req.params.id } },
        { new: true }
      )
    }

    return res.status(200).json(updatedUser.sendAuthUser())
  } catch (error) {
    next(error)
  }
})

const review = asyncHandler(async (req, res, next) => {
  try {
    const { stars, description } = req.body
    const findProduct = await Product.findById(req.params.id)
    if (!findProduct) throw new Error('Produto não cadastrado')

    const reviewExisted = findProduct.reviews?.find(
      (item) => item.postedBy.toString() === req.userId
    )
    const starsAmount =
      findProduct.reviews.reduce((acc, cur) => acc + cur.stars, 0) + stars
    const reviewsLength = findProduct.reviews.length + 1
    const reviewsAvg = Math.round(starsAmount / reviewsLength)

    let updatedProduct
    if (reviewExisted) {
      updatedProduct = await Product.updateOne(
        { reviews: { $elemMatch: reviewExisted } },
        {
          $set: {
            'reviews.$.stars': stars,
            'reviews.$.description': description,
          },
          reviewsAvg,
        },
        { new: true }
      )
    } else {
      updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $push: { reviews: { stars, description, postedBy: req.userId } },
          reviewsAvg,
        },
        { new: true }
      )
    }

    return res.status(200).json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = {
  save,
  update,
  remove,
  findById,
  wishlistToggle,
  review,
}
