var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const connection = require('./connection')
const cors = require('cors')
const session = require('express-session');
const cookieParser = require("cookie-parser");
require("dotenv").config();




var app = express();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(session({
  secret: process.env.TOKEN_SECRET, // use a secure key in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true if using HTTPS
    httpOnly: true,
    maxAge: 10000, // 1 day
  }
}));

app.use(cookieParser())

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3000,()=>{
    console.log('listening to port 3000')
})
