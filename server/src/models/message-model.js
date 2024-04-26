import mongoose from 'mongoose'
const { Schema } = mongoose

const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    userId: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Message', MessageSchema)
