const express = require('express')
const route = express.Router()
const expensesController = require('../../controllers/firm/firmCaseExpenses')
const isFirmAdmin = require('../../middleware/isFirmAdmin')

route.route("/").post(isFirmAdmin, expensesController.create)
route.route("/").get( expensesController.index)
route.route("/:id").patch(expensesController.update)
route.route("/:id").delete(expensesController.deletee)


module.exports = route