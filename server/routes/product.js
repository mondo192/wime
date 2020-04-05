const express = require("express");
const productController = require("../controllers/product");

const router = express.Router();

// get web3 accounts
router.post("/product", productController.createProduct);


module.exports = router;
