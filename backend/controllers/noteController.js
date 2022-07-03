import asyncHandler from 'express-async-handler'
import { noteModel } from '../models/noteModel.js'

// Get Notes - Private
// GET /api/notes

const getNotes = asyncHandler(async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json(notes)
})

// Set Note
// POST /api/notes

const setNote = asyncHandler(async (req, res, next) => {
    if (!req.body.text || !req.body.title){
        res.status(400)
        throw new Error('Missing text or title')
    }

    const note = await noteModel.create({
        title: req.body.title,
        text: req.body.text
    })

    res.status(200).json({message: note})
})

// Update Note - Private
// PUT /api/notes/:id

const updateNote = asyncHandler(async (req, res) => {

    if (!req.body.text || !req.body.title){
        res.status(400)
        throw new Error('Please add text and title')
    }

    const note = await noteModel.updateOne(
        {_id: req.params.id},
        {title: req.body.title,
        text: req.body.text}
        )

    res.status(200).json(note)
})

// Delete Note - Private
// DELETE /api/notes/id

const deleteNote = asyncHandler(async (req, res) => {

    const note = await noteModel.deleteOne(
        {_id: req.params.id })

    res.status(200).json(note)
})

export { getNotes, setNote, updateNote, deleteNote }