import asyncHandler from "express-async-handler";
import { userModel } from "../models/userModel.js";

// Get User - Private
// GET /api/user

const getUser = asyncHandler(async (req, res) => {
})

// Set User - Private
// POST /api/user

const registerUser = asyncHandler(async (req, res) => {
    if (!req.body.user || !req.body.fullName || !req.body.email || !req.body||password) {
        res.status(400)
        throw new Error('Missing all values to register new user')
    }
})

// Update User - Private
// DELETE /api/user

const deleteUser = asyncHandler(async (req, res) => {
})
export { getUser, registerUser, deleteUser }