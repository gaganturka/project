const Joi = require("@hapi/joi");
const universalFunctions = require("../utils/universalFunctions");
// con = require("../models");
import models from "../models";
import Boom from "boom";
import responseMessages from "../resources/response.json";
exports.addCategories = async (req, res) => {
  try {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
      original:req.body.original,
      
    };
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    let { name, description,original } = req.body;
    let payload = {
      name,
      description,
      url: {
        original:original,
        thumb:original,
      },
    };
    let categorieData = await models.categories.create(payload);
    if (!categorieData) {
      throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
    }
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.SUCCESS,
        data: categorieData,
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

exports.editCategories = async (req, res) => {
  try {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
      original: Joi.string().required(),
      
    };
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    let { name, description, original } = req.body;
    let url = {
      original,
      thumb:original,
    };
    let updateCategories = await models.categories.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: name,
          description: description,
          url: url,
        },
      }
    );

    if (!updateCategories) {
      throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
    }
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.CATEGORY_EDIT_SUCCESS,
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

exports.getCategoriesData = async (req, res) => {
  try {
    let categorieData = await models.categories.find();
    if (!categorieData) {
      throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
    }
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.CATEGORY_EDIT_SUCCESS,
        data: categorieData,
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

exports.deleteCategoriesData = async (req, res) => {
  try {
    let categorieData = await models.categories.deleteOne({
      _id: req.params.id,
    });
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.CATEGORY_EDIT_SUCCESS,
        data: categorieData,
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};
exports.createPracticeArea = async (req, res) => {
  try {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
      categoryId: Joi.string().required(),
      original: Joi.string().required(),
    };
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    let { name, description,  categoryId,original } = req.body;
    let payload = {
      name,
      description,
      categoryId,
      url: {
        original:original,
        thumb:original,
      },
    };
    let practiceData = await models.practicearea.create(payload);

    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.SUCCESS,
        data: practiceData,
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};
exports.getPracticeAreaData = async (req, res) => {
  try {
      let practiceAreaData = await models.practicearea.find();
      if (!practiceAreaData) {
        throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
      }
      return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: responseMessages.CATEGORY_EDIT_SUCCESS,
          data: practiceAreaData,
        },
        res
      );
    
    
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};


exports.editPracticeArea = async (req, res) => {
  try {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
      original: Joi.string().required(),
      categoryId: Joi.string().required(),
    };
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    let { name, description, original,categoryId } = req.body;
    let url = {
      original,
      thumb:original,
      
    };
    let updatePracticeArea = await models.practicearea.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: name,
          description: description,
          url: url,
          categoryId
        },
      }
    );

    if (!updatePracticeArea) {
      throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
    }
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.CATEGORY_EDIT_SUCCESS,
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

exports.deletePracticeAreaData = async (req, res) => {
  try {
    let practiceAreaData = await models.practicearea.deleteOne({
      _id: req.params.id,
    });
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.CATEGORY_EDIT_SUCCESS,
        data: practiceAreaData,
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};
