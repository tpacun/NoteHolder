import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(encodeURI(process.env.MONGO_URI))
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
export { connectDB }