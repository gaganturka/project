const Firm = require("../../models/Firm");
const User = require("../../models/User");
const FirmBankAccount = require("../../models/FirmBankAccount");
const universalFunctions = require("../../utils/universalFunctions");
const Joi = require("@hapi/joi");
const Boom = require("boom");
const APP_CONSTANTS = require("../../appConstants");
const responseMessages = require("../../resources/response.json");

const index = async (req, res) => {
  let models = await FirmBankAccount.paginate(
    {
      firmId: req.firm._id,
      name: { $regex: req.query.search ? req.query.search : "", $options: "i" },
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
  const {
    accountHolder,
    accountNumber,
    bank,
    address,
    country,
    state,
    city,
    zipcode,
  } = req.body;

  try {
    const schema = Joi.object({
      accountHolder: Joi.string().alphanum().min(2).max(30).required(),
      accountNumber: Joi.string().min(14).max(14).required(),
      bank: Joi.string().required(),
      address: Joi.string().required(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      zipcode: Joi.string().required(),
    }).unknown(true);
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    let model = null;
        if (accountNumber != null) {
            model = await FirmBankAccount.findOne({
                accountNumber: accountNumber,
                firmId: req.firm.id
            });
        }

        if (model) {
            throw Boom.badRequest(responseMessages.BANK_ACCOUNT_ALREADY_EXIST);
        }

        model = new FirmBankAccount();
        Object.assign(model, req.body);

        model.firmId = req.firm._id;
        model.createdBy = req.user._id;
        model.updatedBy = req.user._id;

        await model.save();
        return universalFunctions.sendSuccess({
            data: model,
        }, res);
  } catch (err) {
    universalFunctions.sendError(err, res);
    console.log(err);
  }
};

const view = async (req, res) => {
  try {
    const model = await FirmBankAccount.findOne({
      _id: req.params.id,
      firmId: req.firm.id,
    });
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
    const {
        accountHolder,
        accountNumber,
        bank,
        address,
        country,
        state,
        city,
        zipcode,
      } = req.body;
  try {

    const schema = Joi.object({
        accountHolder: Joi.string().alphanum().min(2).max(30).required(),
        accountNumber: Joi.string().min(14).max(14).required(),
        bank: Joi.string().required(),
        address: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        zipcode: Joi.string().required(),
      }).unknown(true);
      await universalFunctions.validateRequestPayload(req.body, res, schema);

    const model = await FirmBankAccount.findOne({
      _id: req.params.id,
      firmId: req.firm.id,
    });
    if (model != null) {
      console.log("MODEL = ", model);
      const result = await FirmBankAccount.findOneAndUpdate(
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


