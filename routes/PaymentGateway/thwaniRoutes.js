const express = require("express");

let {
  createThwaniCustomer,
  createPlan,
} = require("../../controllers/PaymentGateway/thwaniControllers");

const { checkAuth } = require("../../middleware/authuser");
const router = express();

router.post("/createThwaniCustomer", checkAuth, createThwaniCustomer);
router.post("/createPlan", createPlan);

module.exports = router;
