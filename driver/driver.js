'use strict';

const io = require('socket.io-client');
const driverSocket = io.connect('http://localhost:3000/csps');


driverSocket.emit('join', 'driver');

driverSocket.on('pickup', (payload) => {
  setTimeout(() => {
    driverSocket.emit('in-transit', payload);
    console.log('in-transit', payload.orderId);

    setTimeout(() => {
      driverSocket.emit('delivered', payload);
      console.log('delivered', payload.orderId);
    }, 3000);
  }, 1000);
});

