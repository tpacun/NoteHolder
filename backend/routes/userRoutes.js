import express from 'express'
import { getUser, registerUser} from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.route('/').get(getUser).post(registerUser)

export {userRouter}