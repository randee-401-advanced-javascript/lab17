'use strict';


const io = require('socket.io')(3000);



io.on('connection', (socket) => {
  console.log('connected to socket', socket.id);
});

const cspsIO = io.of('/csps');

cspsIO.on('connection', (socket) => {
  console.log('csps connected to', socket.id);

  socket.on('join', (payload) => {
    socket.join(payload);
  });

  socket.on('pickup', (payload) => {
    socket.join(payload);
    cspsIO.to('driver').emit('pickup', payload);
  });

  socket.on('delivered', (payload) => {
    cspsIO.to(payload.store).emit('delivered', payload);
  });
});