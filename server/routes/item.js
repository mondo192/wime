const express = require("express");
const itemController = require("../controllers/item");

const router = express.Router();

// get web3 accounts
router.post("/item", itemController.createItem);

// router.get("/item", itemController.;

module.exports = router;
