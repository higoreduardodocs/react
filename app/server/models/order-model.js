import mongoose from 'mongoose'

export const Process = {
  NotProcess: 'not-process',
  Processing: 'processing',
  Shipped: 'shipped',
  Deliverd: 'deliverd',
  Cancelled: 'cancelled',
}

const OrderSchema = new mongoose.Schema(
  {
    products: [{ type: mongoose.ObjectId, ref: 'Product' }],
    payment: {},
    payload: {},
    customer: { type: mongoose.ObjectId, ref: 'User' },
    status: {
      type: String,
      default: Process.NotProcess,
      enum: Process,
      required: true,
    },
  },
  { timestamps: true }
)
export default mongoose.model('Order', OrderSchema)
