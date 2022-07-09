import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please add an email']
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        }
    },
    {
        timestamps: true
    })

const userModel = mongoose.model('User', userSchema)

export { userModel }