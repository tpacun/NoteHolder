import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import { userModel } from '../models/userModel.js';

const protect = asyncHandler(async(req, res, next) => {

    const sentTokenRes = req.headers.authorization
    const sentTokenResArray = sentTokenRes.split(' ')

    if (!sentTokenRes) {
        res.status(400)
        throw new Error('Missing bearer token')

    } else if (sentTokenResArray[0] !== 'Bearer') {
        res.status(400)
        throw new Error('Incorrect authorzation token method')
    }

    try {

        const tokenString = sentTokenResArray[1]
        const authorizeToken = await jwt.verify(tokenString, process.env.JWT_SECRET_KEY)

        req.body.user = await userModel.findById({_id: authorizeToken.id})
        next()

    } catch (error) {

        console.log(error)
        res.status(401)
        throw new Error('not authorized')
        
    }
})

export { protect }