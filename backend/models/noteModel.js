import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
},
{
    timestamps: true
})

const noteModel = mongoose.model('Notes', noteSchema)

export { noteModel }