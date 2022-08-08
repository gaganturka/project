// const moment = require('moment')
const wysaSleep = require('../models/sleepModel')
const validator = require('../validator/validator')



const controller = async (req, res) => {
    try {
        const requestBody = req.body
        const queryParam = req.query

        if (!validator.isValidObject(requestBody)) {
            return res.status(400).send({ status: false, message: 'please fill all required filed' })
        }

        if (!validator.queryParam(queryParam)) {
            return res.status(404).send({ status: false, message: 'page not found' })
        }

        const { nickName, struggleTime, bedTime, wakeUpTime, sleepHours } = requestBody

        if (!validator.isValid(nickName)) {
            return res.status(400).send({ status: false, message: 'Our conversations is private & anonymous, so there is no login. just choose a nickName and we are good to go' })
        }

        if (!validator.isValidString(nickName)) {
            return res.status(400).send({ status: false, message: 'please enter your nickName' })
        }

        if (validator.isValid(struggleTime)) {
            if('Less than 2 weeks, 2 to 8 weeks, More than 8 weeks'.indexOf(struggleTime.trim()) == -1){
                return res.status(400).send({status : false, message : 'StruggleTime should be  ["Less than 2 weeks"/ "2 to 8 weeks"/ "More than 8 weeks"]'})
            }
        }
        else {
            return res.status(400).send({ status: false, message: 'How long have you been struggling with your sleep' })
        }

        if (!validator.isValid(bedTime)) {
            return res.status(400).send({ status: false, message: 'What time do ypu go to bed for sleep' })
        }

        // we can also take time in 24 hours formate and vlidate with the help of moment in bedTime and wakeUpTime
        // if(!moment(bedTime, 'HH:mm').isValid()){
        //     return res.status(400).send({status : false, message : 'please enter bedTIme in HH:MM formate and in military time'})
        // }

        if (!validator.isValidTime(bedTime)) {
            return res.status(400).send({ status: false, message: 'please enter valid bedTime' })
        }

        if (!validator.isValid(wakeUpTime)) {
            return res.status(400).send({ status: false, message: 'What time do you get out of bed to start your day?' })
        }

        if (!validator.isValidTime(wakeUpTime)) {
            return res.status(400).send({ status: false, message: 'please enter valid wakeUpTime' })
        }


        if (!validator.isValid(sleepHours)) {
            return res.status(400).send({ status: false, message: 'how many hours sleep do you get in typical night?' })
        }

        if (!(sleepHours > 0 || sleepHours <= 10)) {
            return res.status(400).send({ status: false, message: 'please Enter sleep hours' })
        }

        let message = ''
        if (sleepHours) {
            if (sleepHours < 4) {
                message = 'you seem to have a VERY LOW sleep efficiency , we will get this up to maximum'
            }

            if (sleepHours <= 6) {
                message = 'you seem to have a LOW sleep efficiency , we will get this up to maximum'
            }

            if (sleepHours >= 7) {
                message = 'you seem to have A GOOD sleep efficiency , we will get this up to maximum '
            }
        }

        const userData = {
            nickName: nickName.trim(),
            struggleTime: struggleTime.trim(),
            bedTime: bedTime.trim(),
            wakeUpTime: wakeUpTime.trim(),
            sleepHours: sleepHours.trim()
        }
        const user = await wysaSleep.create(requestBody)
        if (user) {
            return res.status(201).send({ status: true, messag: message })
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.controller = controller

