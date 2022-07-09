import asyncHandler from "express-async-handler";
import { userModel } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Get User - Private
// GET /api/user/me

const getUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.body.user._id)
        res.status(200).json(user)
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

        // Hash password using bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //Call to MDB/mongoose to create user

        const user = await userModel.create({
            user: req.body.user,
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword
        })

        if (user) {
            res.status(200).json(generateJWT(user._id))    
        }
        
    }
})

// Login User - Private
// POST /api/user/login

const loginUser = asyncHandler(async(req, res) => {
    
    // Check for email address and password
    if (!req.body.email || !req.body.password) {
        res.status(400)
        throw new Error('Missing email address or password')
    }

    // Check if email address exists
    const user = await userModel.findOne({
        email: req.body.email
    })

    if (!user) {
        res.status(400)
        throw new Error('No matching email address')
    }

    // Verify password matches hashed

    const passwordVerification = await bcrypt.compare(req.body.password, user.password)

    // Confirm status, generate and pass JWT
    if (passwordVerification) {
        res.status(200).json({
            email: user.email,
            fullName: user.fullName,
            token: await generateJWT(user._id)
        })
    }

    // Else error

    else {
        res.status(400)
        throw new Error('User credentials invalid.')
    }
})


// Create JWT

const generateJWT = asyncHandler(async(id) => {
    const token = await jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'})
    return token
})

// Not sure if necessarry, can always add later...
// Update User - Private
// DELETE /api/user

// const deleteUser = asyncHandler(async (req, res) => {
// })

export { getUser, registerUser, loginUser}