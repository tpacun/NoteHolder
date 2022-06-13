import express from 'express'
import { getNotes, setNote, updateNote, deleteNote } from '../controllers/noteController.js'

const router = express.Router()

router.route('/').get(getNotes).post(setNote)
router.route('/:id').put(updateNote).delete(deleteNote)

export {router}