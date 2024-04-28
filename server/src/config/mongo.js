const { default: mongoose } = require('mongoose')

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`Conneted to Mongo ${connection.connection.host}`)
  } catch (error) {
    console.log(`Connection error ${error}`)
  }
}

module.exports = dbConnect
