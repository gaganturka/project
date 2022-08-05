const appConstants = require("../../appConstants");
const axios = require("axios");
const joi = require("@hapi/joi");
const universalFunctions = require("../../utils/universalFunctions");
let headerObject = {
  headers: {
    "Content-Type": "application/json",
    "thawani-api-key": appConstants.thwani.testing_secret_key,
  },
};

const createThwaniCustomer = async (req, res) => {
  try {
    const userData = await axios.post(
      `${appConstants.thwani.testing_url}customers`,
      { client_customer_id: req.user.id },
      headerObject
    );
    console.log("userData", userData.data);
  } catch (err) {
    console.log(err);
  }
};

const createPlan = async (req, res) => {
  try {
    const schema = {
      name: joi.string(),
      amount: joi.number(),
      interval: joi.string(),
    };
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    let payload = req.body;
    const userData = await axios.post(
      `${appConstants.thwani.testing_url}plans`,

      headerObject,
      payload
    );
    console.log("userData", userData.data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createThwaniCustomer,
  createPlan
};
