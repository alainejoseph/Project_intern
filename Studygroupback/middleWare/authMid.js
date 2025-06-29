const user = require('../Models/User')
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.verifyUser = (req, res) => {
 const token = req.cookies.token
 if(!token)
 {
    res.json({status:false})
 }
 jwt.verify(token,process.env.TOKEN_SECRET,async(err,data)=>{
    if(err){
        return res.json({status:false})
    }
    else{
        const userL = await user.findById(data.id)
        if(user){ return res.json({status:true,user:userL.name})}
        else return res.json({status:false})
    }
 })
}