const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        price: Number,
        quantity: Number,
        size: String,
        color: String,
        subAmount: Number,
      },
    ],
    shipping: { type: Number, default: 0 },
    amount: { type: Number, required: true },
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not Processed',
        'Cash on Delivery',
        'Processing',
        'Dispatched',
        'Cancelled',
        'Delivered',
      ],
    },
    orderBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Order', orderSchema)
