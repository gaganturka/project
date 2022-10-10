const Firm = require("../../models/Firm");
const User = require("../../models/User");
const FirmLocation = require("../../models/FirmLocation");
const universalFunctions = require("../../utils/universalFunctions");
const Joi = require("@hapi/joi");
const Boom = require("boom");
const APP_CONSTANTS = require("../../appConstants");
const responseMessages = require("../../resources/response.json");

const index = async (req, res) => {
  let models = await FirmLocation.paginate(
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
  const { name, address1, address2, country, state, city, zipcode } = req.body;

  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      address1: Joi.string().required(),
      address2: Joi.string().required(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      zipcode: Joi.string().required(),
    }).unknown(true);
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    const location = await FirmLocation.findOne({
      firmId: req.firm.id,
      name: name,
    });

    if (location) {
      throw Boom.badRequest(responseMessages.LOCATION_ALREADY_EXISTS);
    }
    const result = await FirmLocation.create({
      firmId: req.firm.id,
      name: name,
      address1: address1,
      address2: address2,
      country: country,
      state: state,
      city: city,
      zipcode: zipcode,
    });

    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "Event Location Added !",
        data: "",
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
    const model = await FirmLocation.findOne({
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
  try {
    const { name, address1, address2, country, state, city, zipcode } =
      req.body;

    const schema = Joi.object({
      name: Joi.string().required(),
      address1: Joi.string().required(),
      address2: Joi.string().required(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      zipcode: Joi.string().required(),
    }).unknown(true);
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    const model = await FirmLocation.findOne({
      _id: req.params.id,
      firmId: req.firm.id,
    });
    if (model != null) {
      console.log("MODEL = ", model);
      const result = await FirmLocation.findOneAndUpdate(
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
      throw new Error(responseMessages.PRACTICE_AREA_NOT_FOUND);
    }
  } catch (err) {
    universalFunctions.handleError(err, res);
  }
};

module.exports = { index, create, view, update };
