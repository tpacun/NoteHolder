import express from 'express'
import { getUser, registerUser, deleteUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.route('/').get(getUser).put(registerUser).delete(deleteUser)

export {userRouter}