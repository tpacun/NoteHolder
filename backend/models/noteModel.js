import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title value']
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }},
    {timestamps: true}
    )

const noteModel = mongoose.model('Notes', noteSchema)

export { noteModel }