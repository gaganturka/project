const Firm = require("../../models/Firm");
const User = require("../../models/User");
const RequestFund = require("../../models/RequestFund");
const universalFunctions = require("../../utils/universalFunctions");
const Joi = require("@hapi/joi");
const Boom = require("boom");
const APP_CONSTANTS = require("../../appConstants");
const responseMessages = require("../../resources/response.json");

const index = async (req, res) => {
  let models = await RequestFund.paginate(
    {
      $and: [
        { firmId: req.firm._id },
        {
          $or: [
            {
              amount: {
                $regex: req.query.search ? req.query.search : "",
                $options: "i",
              },
            },
            {
              message: {
                $regex: req.query.search ? req.query.search : "",
                $options: "i",
              },
            },
          ],
        },
      ],
    },
    {
      sort: {
        updatedAt: "desc",
      },
      page: req.query.page ? req.query.page : 1,
      limit: req.query.limit ? req.query.limit : APP_CONSTANTS.PER_PAGE,
    }
  );
  universalFunctions.sendSuccess(
    {
      data: models,
    },
    res
  );
};

const create = async (req, res) => {
  const { caseContactId, amount, dueDate, depositInto, message } = req.body;

  try {
    const schema = Joi.object({
      caseContactId: Joi.string().hex().length(24).required(),
      amount: Joi.string().required(),
      dueDate: Joi.string().required(),
      depositInto: Joi.string().required(),
      message: Joi.string().required(),
    }).unknown(true);
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    let model = null;
    model = new RequestFund();
    Object.assign(model, req.body);

    model.firmId = req.firm._id;
    model.createdBy = req.user._id;
    model.updatedBy = req.user._id;

    await model.save();
    return universalFunctions.sendSuccess(
      {
        data: model,
      },
      res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
    console.log(err);
  }
};

const view = async (req, res) => {
  try {
    const model = await RequestFund.findOne({
      _id: req.params.id,
      firmId: req.firm.id,
    }).populate("depositInto caseContactId");
    if (model != null) {
      return universalFunctions.sendSuccess(
        {
          data: model,
        },
        res
      );
    } else {
      throw new Error(responseMessages.LOCATION_NOT_FOUND);
    }
  } catch (err) {
    universalFunctions.sendError(err, res);
  }
};

const update = async (req, res) => {
  const { caseContactId, amount, dueDate, depositInto, message } = req.body;
  try {
    const schema = Joi.object({
      caseContactId: Joi.string().hex().length(24).required(),
      amount: Joi.string().required(),
      dueDate: Joi.string().required(),
      depositInto: Joi.string().required(),
      message: Joi.string().required(),
    }).unknown(true);
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    const model = await RequestFund.findOne({
      _id: req.params.id,
      firmId: req.firm.id,
    });
    if (model != null) {
      console.log("MODEL = ", model);
      const result = await RequestFund.findOneAndUpdate(
        {
          _id: req.params.id,
          firmId: req.firm.id,
        },
        { $set: req.body }
      );

      return universalFunctions.sendSuccess(
        {
          data: result,
        },
        res
      );
    } else {
      throw new Error(responseMessages.BANK_ACCOUNT_NOT_FOUND);
    }
  } catch (err) {
    universalFunctions.handleError(err, res);
  }
};

module.exports = { index, create, view, update };
