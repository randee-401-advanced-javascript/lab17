'use strict';

const net = require('net');
const faker = require('faker');
const socket = new net.Socket();

socket.connect({ port: 3000, host: 'localhost' }, () => {
  console.log('vendor is connected to server');
});

socket.on('data', (payload) => {
  let parsed = JSON.parse(payload.toString());

  if (parsed.event === 'delivered') {
    console.log('Thank you for delivering order', parsed.order.id);
  }
});

setInterval(() => {
  let order = {
    store: faker.company.companyName(),
    id: faker.random.uuid(),
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    address: faker.address.streetAddress(),
  }

  socket.write(JSON.stringify({ event: 'pickup', order: order}));
}, 5000)