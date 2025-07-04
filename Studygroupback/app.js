var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {createServer} = require('http')
const connection = require('./connection')
const cors = require('cors')
const session = require('express-session');
const cookieParser = require("cookie-parser");
const {Server} = require('socket.io');
const mongoose = require('mongoose')
const { instrument } = require("@socket.io/admin-ui");
require("dotenv").config();




var app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{cors:{origin:['http://localhost:5173','https://admin.socket.io']}});



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
     // 1 day
  }
}));

app.use(cookieParser())

app.use('/', indexRouter);
app.use('/users', usersRouter);


const Message = mongoose.model('Message', new mongoose.Schema({
  sender: String,
  content: String,
  room: String,
  timestamp: { type: Date, default: Date.now }
}));

const usersInRoom = {}; // room -> [{ id, name }]

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    usersInRoom[room] = usersInRoom[room] || [];
    usersInRoom[room].push({ id: socket.id, name: username });
    console.log(`${username} has joined ${room}`)

    io.to(room).emit('roomUsers', usersInRoom[room]);

    Message.find({ room }).then(messages => {
      socket.emit('chatHistory', messages);
    });
  });

  socket.on('sendMessage', async ({ sender, content, room }) => {
    const msg = await Message.create({ sender, content, room });
    console.log('hello')
    io.to(room).emit('receiveMessage', msg);
  });

  socket.on('leaveRoom', (room) => {
    socket.leave(room);
    if (usersInRoom[room]) {
      usersInRoom[room] = usersInRoom[room].filter(u => u.id !== socket.id);
      io.to(room).emit('roomUsers', usersInRoom[room]);
      console.log(`user left ${room}`);
    }
  });

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms].filter(r => r !== socket.id);
    rooms.forEach(room => {
      if (usersInRoom[room]) {
        usersInRoom[room] = usersInRoom[room].filter(u => u.id !== socket.id);
        io.to(room).emit('roomUsers', usersInRoom[room]);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});


httpServer.listen(3000,()=>{
    console.log('listening to port 3000')
})
