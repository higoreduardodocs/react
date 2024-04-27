import mongoose from 'mongoose'

export const Role = {
  User: 'user',
  Administrator: 'administrator',
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: Role, default: Role.User, required: true },
  },
  { timestamps: true }
)
export default mongoose.model('User', UserSchema)
