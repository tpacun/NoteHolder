import express from 'express';
import { getUser, registerUser, loginUser} from '../controllers/userController.js';
import { protect } from '../middleware/authorizationMiddleware.js';

const userRouter = express.Router()

userRouter.route('/').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.get('/me', protect, getUser)

export { userRouter }