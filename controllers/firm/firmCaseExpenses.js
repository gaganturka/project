const firmExpense = require('../../models/FirmCaseExpenses')
const universalFunctions = require("../../utils/universalFunctions");
const responseMessages = require("../../resources/response.json");

const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const create = async (req,res) => {
    try{
        const requestBody = req.body
        console.log(requestBody)

        const { firmId, firmCaseId, firmCaseEmployeeId, firmActivityTypeId, isBillable, description, date, cost, quantity, amount } = requestBody
console.log('print');

        const schema = Joi.object({
            firmId : Joi.string().hex().length(24).required(),
            firmCaseId : Joi.string().hex().length(24).required(),
            firmCaseEmployeeId : Joi.string().hex().length(24),
            firmActivityTypeId : Joi.string().hex().length(24).required(),
            isBillable : Joi.boolean().required(),
            description : Joi.string(),
            date : Joi.date(),
            cost : Joi.number().required(),
            quantity : Joi.number(),
            amount : Joi.number().required()
        })
        requestBody['firmId'] = (req.firm._id).toString()
console.log('not print');
        await universalFunctions.validateRequestPayload(req.body, res, schema)
        console.log('hlo');


        model = new firmExpense();
        Object.assign(model, req.body);



        await model.save();
        console.log('modal', model);
        return universalFunctions.sendSuccess({
            data: model,
        }, res);

    } catch(err){
        console.log(err)
        res.json(err)
    }
}

const index = async (req, res) => {
    try {
        console.log(req.params), req.firm;
        const model = await firmExpense.find({});
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



const update = async (req, res) => {
    try {

        const requestBody = req.body

        const { firmId, firmCaseId, firmCaseEmployeeId, firmActivityTypeId, isBillable, description, date, cost, quantity, amount } = requestBody


        const schema = Joi.object({
            firmId : Joi.string().hex().length(24).required(),
            firmCaseId : Joi.string().hex().length(24).required(),
            firmCaseEmployeeId : Joi.string().hex().length(24),
            firmActivityTypeId : Joi.string().hex().length(24).required(),
            isBillable : Joi.boolean().required(),
            description : Joi.string(),
            date : Joi.date(),
            cost : Joi.number().required(),
            quantity : Joi.number(),
            amount : Joi.number().required()
        })


        await universalFunctions.validateRequestPayload(req.body, res, schema);

        const model = await firmExpense.findOne({
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
        let categorieData = await firmExpense.deleteOne({
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





module.exports = { create, update, deletee, index }