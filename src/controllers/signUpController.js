const bcrypt = require('bcrypt')

const registrationModel = require('../models/signUpModel')
const validator = require('../validator/validator')
const salt = 10



const register = async (req, res) => {
    try {
        const requestBody = req.body
        const queryParam = req.query
        if (!validator.isValidObject(requestBody)) {
            return res.status(400).send({ status: false, message: "please fill all required fields" })
        }

        if (!validator.queryParam(queryParam)) {
            return res.status(400).send({ status: false, message: 'page not found' })
        }

        const { nickName , password } = requestBody

        if (!validator.isValid(nickName)) {
            return res.status(400).send({ status: false, message: "please enter your nickName" })
        }

        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "please enter  password" })
        }

        if (!validator.isValidPW(password)) {
            return res.status(400).send({ status: false, message: "please enter valid password, between 8 to 15 characters" })
        }


        const isEmailInUse = await registrationModel.findOne({ nickName })
        if (isEmailInUse) {
            return res.status(400).send({ status: false, message: "nickName already registered, enter unique nickName" })
        }


        // conveting password into encrypted password
        const hash = await bcrypt.hash(password, salt)
        // requestBody.password = hash


        const userData = {
            nickName: nickName,
            password: hash,
           
        }
        //here we can use create(data) but to avoid unnecessary key (like isDeleted) we use userData
        const user = await registrationModel.create(userData)
        return res.status(201).send({ status: true, message: 'User created successfully', data: user })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.register = register