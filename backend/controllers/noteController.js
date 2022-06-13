import asyncHandler from 'express-async-handler'

// Get Notes - Private
// GET /api/notes

const getNotes = asyncHandler(async (req, res) => {
    res.status(200).json({data: 'Get notes.'})
})
// Set Note
// POST /api/notes

const setNote = asyncHandler(async (req, res, next) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add text')
    }

    res.status(200).json({data: 'Set note.'})
})

// Update Note - Private
// PUT /api/notes/:id

const updateNote = asyncHandler(async (req, res) => {
    res.status(200).json({data: `update note ${req.params.id}.`})
})

// Delete Note - Private
// DELETE /api/notes/id

const deleteNote = asyncHandler(async (req, res) => {
    res.status(200).json({data: `Delete note ${req.params.id}.`})
})

export { getNotes, setNote, updateNote, deleteNote }