const mongoose = require('mongoose')

const con = mongoose.connect('mongodb+srv://alainejoseph:2004@cluster0.j5wnkmm.mongodb.net/StudyGroup?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("db is connected");
})