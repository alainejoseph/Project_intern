var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    pass:String,
    terms:String
})

const User = mongoose.model('users', userSchema);
module.exports=User