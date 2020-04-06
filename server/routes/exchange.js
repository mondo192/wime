const express = require("express");
const exchangeController = require("../controllers/exchange");

const router = express.Router();

router.post("/exchange", exchangeController.buyTokens);

module.exports = router;
