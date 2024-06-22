const express = require("express");
const authRoute = express.Router();
const { login, logout} = require("../controllers/auth");

authRoute.post("/user/login", login);
authRoute.post("/user/logout", logout);

module.exports = {
  authRoute,
};
