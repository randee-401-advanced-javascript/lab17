'use strict';

const io = require('socket.io-client');
const faker = require('faker');
const pulletSocket = io.connect('http://localhost:3000/csps');



pulletSocket.emit('join', 'pullet-shop');

pulletSocket.on('delivered', (payload) => {
  console.log('Pullet order ' + payload.orderID + 'has been delivered. Keep those gals warm!');
})


setTimeout(() => {
  setInterval(() => {
    let order = {
    store: 'pullet-shop',
    orderId: faker.random.uuid(),
    customer: faker.name.firstName,
    address: faker.address.streetAddress(), 
    };

    pulletSocket.emit('pickup', order);
  }, 5000);
}, 3000);

