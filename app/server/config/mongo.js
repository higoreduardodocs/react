import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL)
    console.log(
      'Conneted to Mongo: ' + `${connection.connection.host}`.bgMagenta.white
    )
  } catch (error) {
    console.log('Connection error: ' + `${error}`.bgRed.white)
  }
}
export default connectDB
