const express = require("express");
const bodyParser = require("body-parser");
const accountRoute = require("./routes/account");
const productRoute = require("./routes/product");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", accountRoute);
app.use("/api", productRoute);

app.listen(8080);
