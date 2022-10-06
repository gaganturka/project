const firmCase = require('../../models/FirmCaseTimeEntries')
const universalFunctions = require("../../utils/universalFunctions");
const responseMessages = require("../../resources/response.json");
// const {FirmActivityTypes} = require('../../models/FirmActivityTypes')

const mongoose = require('mongoose')
const moment = require('moment')

const Joi = require('@hapi/joi');
const { unknown } = require('joi/lib/types/object');




const create = async (req, res) => {
    try {

        const requestBody = req.body
        const { firmId, firmCaseId, firmCaseEmployeeId, firmActivityTypeId, isBillable, description, date, rate, duration, amount, rateType } = requestBody


        const schema = Joi.object({
            firmId: Joi.string().hex().length(24).required(),
            firmCaseId: Joi.string().hex().length(24).required(),
            firmCaseEmployeeId: Joi.string().hex().length(24),
            firmActivityTypeId: Joi.string().hex().length(24).required(),
            isBillable: Joi.boolean().required(),
            description: Joi.string(),
            date: Joi.date(),
            rate: Joi.number().required(),
            duration: Joi.number().default(1),
            amount: Joi.number().required(),
            rateType: Joi.string().required()
        })
        requestBody['firmId'] = (req.firm._id).toString()

        let amountt = ''
        if (requestBody.rateType == 'hourly') {
            amountt = +requestBody.rate * +requestBody.duration
        } else {
            amountt = rate
        }

        requestBody['amount'] = amountt
        console.log('resss', requestBody);

        await universalFunctions.validateRequestPayload(req.body, res, schema)

        model = new firmCase();
        Object.assign(model, req.body);



        await model.save();
        return universalFunctions.sendSuccess({
            data: model,
        }, res);

    }
    catch (err) {
        res.json(err)
    }

}

const view = async (req, res) => {
    try {
        console.log('ndbdjbdsbdqjkbdjhsdbw',req.query);
        let queryFields = {}


        let dateUpdate = {}
        
          const { startingDate, endDate, description } = req.query


        if (startingDate) {
            dateUpdate["$gte"] =  startingDate
        }

        if (endDate) {
            dateUpdate["$lte"] =  endDate
        }

        if(Object.keys(dateUpdate).length > 0){
            queryFields['date'] = dateUpdate
        }

        if (description) {
            queryFields['description'] = { $regex: `${description}`}  
        }

        const options = {
            // populate : "firmActivityTypeId",
            page: req.query.page ? req.query.page : 1,
                        limit: 10,
        //     collation: {
        //       locale: 'en',
        //     },
          };

        //   (queryFields).populate('firmActivityTypeId'

        const model = await firmCase.paginate(queryFields, options
        )//paginate({},{ offset: 3, limit: 2})

        console.log(model);

        if (model != null) {
            return universalFunctions.sendSuccess({
                data: model,
            }, res);
        } else {
            throw new Error(responseMessages.EMPLOYEE_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.sendError(err, res);
    }
};

const update = async (req, res) => {
    try {
        console.log('hvjhbkhbjlknhjvjklhjknbjhvghknjhmgbk', req.body       );

        const requestBody = req.body
        const { firmId, firmCaseId, firmCaseEmployeeId, firmActivityTypeId, isBillable, description, date, rate, duration, amount, rateType } = requestBody


        const schema = Joi.object({
            firmId: Joi.string().hex().length(24),
            firmCase: Joi.string().hex().length(24),
            firmCaseEmployeeId: Joi.string().hex().length(24),
            firmActivityTypeId: Joi.string().hex().length(24),
            isBillable: Joi.boolean(),
            description: Joi.string(),
            date: Joi.date(),
            rate: Joi.number(),
            duration: Joi.number(),
            amount: Joi.number(),
            rateType: Joi.string()
        }).unknown(true)


        await universalFunctions.validateRequestPayload(req.body, res, schema);

        const model = await firmCase.findOne({
            _id: req.params.id,
        });
        if (model != null) {
            Object.assign(model, req.body);

            await model.save()
            return universalFunctions.sendSuccess({
                data: model,
            }, res);



        } else {
            throw new Error(responseMessages.EMPLOYEE_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.handleError(err, res);
    }
};


const deletee = async (req, res) => {
    try {
        let categorieData = await firmCase.deleteOne({
            _id: req.params.id,
        });
        return universalFunctions.sendSuccess(
            {
                statusCode: 200,
                message: "catogeries deleted successfully",
                data: categorieData,
            },
            res
        );
    } catch (err) {
        return universalFunctions.sendError(err, res);
    }
};

const index = async (req, res) => {
    try {
        console.log(req.params, req.firm)
        const model = await firmCase.findOne({
            _id: req.params.id,
            firmId: req.firm.id
        });
        if (model != null) {
            return universalFunctions.sendSuccess({
                data: model,
            }, res);
        } else {
            throw new Error(responseMessages.CONTACT_GROUP_NOT_FOUND);
        }
    } catch (err) {
        universalFunctions.sendError(err, res);
    }
};




module.exports = { create, view, update, deletee, index }