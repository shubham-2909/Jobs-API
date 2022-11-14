const User = require("../models/User")
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const { UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    const {email,password,name} = req.body
    if(!name || !email || !password){
        throw new BadRequestError('Missing Credentials')
    }
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Missing Credentials')
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isCorrect = await user.comparePassword(password)
    if (!isCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }


    const token = user.createJWT()

    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })

}

module.exports = {
    register,
    login
}