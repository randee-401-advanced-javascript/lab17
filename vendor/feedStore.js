'use strict';

const io = require('socket.io-client');
const faker = require('faker');
const feedSocket = io.connect('http://localhost:3000/csps');

feedSocket.emit('join', 'feed-shop');

feedSocket.on('delivered', (payload) => {
  console.log('Your feed order has been delivered', payload.orderId);
})

setTimeout (() => {
  setInterval(() => {
    let order = {
      store: 'feed-shop',
      orderId: faker.random.uuid(),
      customer: faker.name.firstName,
      address: faker.address.streetAddress(),
    }

    feedSocket.emit('pickup', order);
  }, 5000);
}, 3000)
