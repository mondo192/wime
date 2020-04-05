const express = require("express");
const accountController = require("../controllers/account");

const router = express.Router();

router.get("/account", accountController.getAccounts);

module.exports = router;
