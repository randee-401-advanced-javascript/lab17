'use strict';


const sio = require('socket.io');
const server = sio(3000);


server.on('connection', (socket) => {
  console.log('connected to socket', socket.id);

  socket.join('room-in-field');

  socket.on('vendor', (payload) => {
    console.log('vendor stuff goes here');
    server.emit('in-transit', payload);
  });
});

const messagesServer = server.of('/messages');

messagesServer.on('connection', (socket) => {
  socket.join('messages-shout-room');
  console.log('this socket is in the messages building', socket.id);

  socket.on('driver', (payload) => {
    console.log('I do not know whats happening');
    messagesServer.emit('shout-heard', payload);
    messagesServer
      .to('messages-shouter-room')
      .emit('room-secret', 'secret')
  });
});



//listen to connection events, and do something
//socket that is trying to connect to server 

// const logger = (payload) => {
//   let parsed = JSON.parse(payload.toString());

//   for (let i =0; i < socketPool.length; i++) {
//     let socket = socketPool[i];
//     socket.write(payload);
//   }

//   if (parsed.event === 'pickup') {
//     console.log('pickup');
//     console.log('- Time:', new Date());
//     console.log('- Store', parsed.order.store);
//     console.log('- OrderId;', parsed.order.id);
//     console.log('- Customer: ', parsed.order.name);
//     console.log('Address:', parsed.order.address);
  
//   }

//   if (parsed.event === 'in-transit')
//     console.log('In-transit order', parsed.order.id);

//   if (parsed.event === 'delivered')
//     console.log('Delivered order', parsed.order.id);

// };

// server.on('connections', (socket) => {
//   console.log('socket connected to me');
//   socketPool.push(socket);
//   socket.on('data', logger);
// });