import mongoose from 'mongoose'

const { Schema } = mongoose

const GigSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    shortTitle: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    cover: { type: String, required: true },
    images: { type: [String], required: false },
    price: { type: Number, required: true },
    deliveryTime: { type: Number, required: true },
    revisionNumber: { type: Number, required: true },
    features: { type: [String], required: false },
    starAmount: { type: Number, default: 0 },
    starNumber: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
  },
  { timestamps: true }
)
export default mongoose.model('Gig', GigSchema)
