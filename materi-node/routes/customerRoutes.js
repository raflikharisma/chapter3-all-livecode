const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

router.route("/").get(customerController.getAllData).post(customerController.createData);
router.route("/:id").get(customerController.getDataById).patch(customerController.updateDataById).delete(customerController.deleteDataById);

module.exports = router;
