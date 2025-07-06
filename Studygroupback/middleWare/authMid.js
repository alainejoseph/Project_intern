const user = require("../Models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.verifyUser = (req, res, next) => {
  const user = req.session.user;
  console.log("auth test \n", user);
  if (!req.session.user) {
    res.status(404).json({ status: false });
  } else {
    res.status(200).json({ user: req.session.user });
    next();
  }
};
