const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    isBlocked: { type: Boolean, default: false },
    cart: { type: Array, default: [] },
    address: {
      type: {
        street: { type: String, required: true },
        neighborhood: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        number: { type: String },
        zipCode: { type: Number, required: true },
      },
      required: true,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    coupons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }],
    refreshToken: { type: String },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSaltSync(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.isPasswordMatched = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000 // 10 minutes
  return resetToken
}

userSchema.methods.sendAuthUser = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    mobile: this.mobile,
    address: this.address,
    wishlist: this.wishlist,
  }
}

module.exports = mongoose.model('User', userSchema)
