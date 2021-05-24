const express = require('express');
const {addUser, getUser, deleteUser, getUsers} = require('./users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const server = app.listen(5000, function() {
  console.log('Listening to port 5000.');
});

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('login', ({name, room}) => {
    const {user, error} = addUser(socket.id, name, room);
    if (error) return console.log(error);
    socket.join(user.room);
    io.in(room).emit('updateUsers', getUsers(room));
  });

  socket.on('sendMessage', message => {
    const user = getUser(socket.id);
    io.in(user.room).
        emit('message',
            {name: message.name, text: message.text, time: message.time});
  });

  socket.on('logout', () => {
    const user = deleteUser(socket.id);
    if (user) {
      io.in(user.room).emit('updateUsers', getUsers(user.room));
    }
  });

  socket.on('disconnect', () => {
    const user = deleteUser(socket.id);
    if (user) {
      io.in(user.room).emit('updateUsers', getUsers(user.room));
    }
  });
});

module.exports = app;
