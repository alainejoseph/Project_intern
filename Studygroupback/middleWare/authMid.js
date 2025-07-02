const user = require('../Models/User')
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.verifyUser = (req, res,next) => {
 const user = req.session.user
 if(!user)
 {
    res.json({status:false})
 }
 next()
}
