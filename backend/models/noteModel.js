import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title value']
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
}})

const noteModel = mongoose.model('Notes', noteSchema)

export { noteModel }