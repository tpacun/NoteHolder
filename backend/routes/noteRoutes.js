import express from 'express'
import { getNotes, setNote, updateNote, deleteNote } from '../controllers/noteController.js'
import { protect } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getNotes).post(protect, setNote)
router.route('/:id').put(protect, updateNote).delete(protect, deleteNote)

export {router}