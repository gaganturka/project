const Joi = require("@hapi/joi");
const universalFunctions = require("../utils/universalFunctions");
const jwt = require("jsonwebtoken");
const APP_CONSTANTS = require("../appConstants");
const User = require("../models/User");
const { Config } = require("../config");
const _ = require('lodash')
const models = require("../models");
const Boom = require("boom");
const responseMessages =require("../resources/response.json");
exports.addCategories = async (req, res) => {
  try {
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
      original: Joi.string().required().allow(""),
    };
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    let createdBy = "";
    const token = req.header("auth-token");
    if (!token) {
      res.status(403).send({ error: "Please authenticate using valid token" });
    }
    const data = jwt.verify(token, Config.jwtsecret);
    console.log(data, "jwttokenbyadmin");
    if (!data) {
      throw Boom.badRequest(responseMessages.INVALID_TOKEN);
    }
    const user = await User.findOne({ _id: data.user_id });
    console.log(user, "userinisadmin");
    if (user === null) {
      throw Boom.badRequest("invalid credentials no such admin exists");
    } else if (user.role === APP_CONSTANTS.role.admin) {
      createdBy = user.firstName + " " + user.lastName;
      // console.log("satyamtomar user name",createdBy,user.name)
    } else {
      throw Boom.badRequest("invalid credentials of admin");
    }
    let { name, description, original } = req.body;
    let payload = {
      name,
      description,
      url: {
        original: original,
        thumb: original,
      },
      createdBy,
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
      original: Joi.string().required().allow(""),
      createdBy: Joi.string().required(),
    };
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    let { name, description, original } = req.body;
    let url = {
      original,
      thumb: original,
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
        message: "categories fetched succcessfully",
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
        message: "catogeries deleted successfully",
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
      original: Joi.string().required().allow(""),
    };

    await universalFunctions.validateRequestPayload(req.body, res, schema);
    let createdBy = "";
    const token = req.header("auth-token");
    if (!token) {
      res.status(403).send({ error: "Please authenticate using valid token" });
    }
    const data = jwt.verify(token, Config.jwtsecret);
    console.log(data, "jwttokenbyadmin");
    if (!data) {
      throw Boom.badRequest(responseMessages.INVALID_TOKEN);
    }
    const user = await User.findOne({ _id: data.user_id });
    console.log(user, "userinisadmin");
    if (user === null) {
      throw Boom.badRequest("invalid credentials no such admin exists");
    } else if (user.role === APP_CONSTANTS.role.admin) {
      createdBy = user.firstName + " " + user.lastName;
    } else {
      throw Boom.badRequest("invalid credentials of admin");
    }

    let { name, description, categoryId, original } = req.body;
    let payload = {
      name,
      description,
      categoryId,
      url: {
        original: original,
        thumb: original,
      },
      createdBy,
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
        message: "fetched practice areas are",
        data: practiceAreaData,
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};
exports.getPracticeAreaDataPopulated = async (req, res) => {
  try {
    let practiceAreaData = await models.practicearea
      .find()
      .populate("categoryId");
    if (!practiceAreaData) {
      throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
    }
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "fetched practice areas are",
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
      original: Joi.string().required().allow(""),
      categoryId: Joi.string().required(),
      createdBy: Joi.string().required(),
    };
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    let { name, description, original, categoryId, createdBy } = req.body;
    let url = {
      original,
      thumb: original,
    };
    let updatePracticeArea = await models.practicearea.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: name,
          description: description,
          url: url,
          categoryId,
          createdBy,
        },
      }
    );

    if (!updatePracticeArea) {
      throw Boom.badRequest("practice area not found");
    }
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "practice area successfully edited",
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

exports.deletePracticeArea = async (req, res) => {
  try {
    let practiceAreaData = await models.practicearea.deleteOne({
      _id: req.params.id,
    });
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "PracticeArea deleted successfully",
        data: practiceAreaData,
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};
exports.getCategoryDetails = async (req, res) => {
  try {
    const category = await models.categories.findOne({ _id: req.params.id });
    if (!category) {
      throw Boom.badRequest("cannot find any expert");
    }

    console.log("categorydetails", category, "categorydetails");
    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "Expert details are",
        data: category,
      },
      res
    );
  } catch (error) {
    universalFunctions.sendError(error, res);
  }
};

exports.getPracticeAreaDetails = async (req, res) => {
  try {
    const practice = await models.practicearea.findOne({ _id: req.params.id });
    if (!practice) {
      throw Boom.badRequest("cannot find any expert");
    }

    console.log("practiceareadetails", practice, "practiceareadetails");
    universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "Expert details are",
        data: practice,
      },
      res
    );
  } catch (error) {
    universalFunctions.sendError(error, res);
  }
};

exports.getPracticeAreaDataInGroups = async (req, res) => {
  try {
    let practiceAreaData = await models.practicearea.find();
    if (!practiceAreaData) {
      throw Boom.badRequest(responseMessages.CATEGORY_NOT_FOUND);
    }
    
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "fetched practice areas are",
        data: _.chunk(practiceAreaData, 2),
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};
