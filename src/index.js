const express = require("express");
const cors = require("cors");

const app = express();

const userController = require("./controllers/user.controller");
const { login, register } = require("./controllers/auth");

app.use(express.json());
app.use(cors());
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    limit: "5000mb",
    extended: true,
    parameterLimit: 100000000000,
  })
);

app.use("/", userController);
app.post("/login", login);
app.post("/register", register);

module.exports = app;
