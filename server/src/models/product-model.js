const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    offer: { type: Number },
    stock: { type: Number, required: true },
    stockOffer: { type: Number },
    offerCreatedAt: { type: Date },
    offerDeadlineAt: { type: Date },
    cover: { type: { public_id: String, url: String }, required: true },
    images: [{ public_id: String, url: String }],
    sizes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Size' }],
      required: true,
    },
    colors: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }],
      required: true,
    },
    tags: { type: [String] },
    sold: { type: Number, default: 0 },
    reviews: [
      {
        stars: { type: Number, min: 1, max: 5 },
        description: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    reviewsAvg: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
