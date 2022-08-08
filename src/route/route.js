const express = require("express")
const sleepController = require('../controllers/sleepControllers')
const signUpController = require('../controllers/signUpController')

const router = express.Router()


router.get("/test-me", (req,res) => {
    console.log('Hi, setup done')
    res.send('Done')

})

router.post("/wysa", sleepController.controller)
router.post('/signUp', signUpController.register )

module.exports = router