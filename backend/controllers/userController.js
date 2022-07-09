import asyncHandler from "express-async-handler";
import { userModel } from "../models/userModel.js";
import bcrypt from 'bcryptjs';

// Get User - Private
// GET /api/user

const getUser = asyncHandler(async (req, res) => {
    if (!req.body.email) {
        res.status(400)
        throw new Error('Missing email address')
    } else{
        const user = await userModel.find({
            email: req.body.email
        })
        res.status(200).json(user)
    }
})

// Set User - Private
// POST /api/user

const registerUser = asyncHandler(async (req, res, next) => {

    // Check if all required fields are in request
    if (!req.body.user || !req.body.fullName || !req.body.email || !req.body||!req.body.password) {
        res.status(400)
        throw new Error('Missing all values to register new user')
    }

    // Check if the user already exists in mongodb and...

    const userExists = await userModel.findOne({
        email: req.body.email
    })

    // ...throw error if true

    if (userExists) {
        res.status(400)
        throw new Error('User email adress already used. Please try with a different one.')
    }
    
    else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await userModel.create({
            user: req.body.user,
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword
        })
        res.status(200).json(user)
    }
})

// Not sure if necessarry.
// Update User - Private
// DELETE /api/user

// const deleteUser = asyncHandler(async (req, res) => {
// })

export { getUser, registerUser}