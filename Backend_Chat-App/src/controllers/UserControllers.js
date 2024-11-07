const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
const generateToken = require('../config/GenerateToken')

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, avatar } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('The input is required')
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name, email, password, avatar
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Failed to create the user')
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log('zz', email, password);

    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
})

module.exports = {
    createUser,
    authUser
}