import mongoose from 'mongoose'
const { Schema } = mongoose

const ConversationSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sellerName: { type: String, required: true },
    buyerName: { type: String, required: true },
    readBySeller: { type: Boolean, required: true },
    readByBuyer: { type: Boolean, required: true },
    lastMessage: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Conversation', ConversationSchema)
