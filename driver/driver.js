'use strict';

const net = require('net');
const socket = new net.Socket();

socket.connect({ port: 3000, host: 'localhost'}, () => {
  console.log('connected to server');
});

socket.on('data', (payload) => {
  let parsed = JSON.parse(payload.toString());

  if(parsed.event === 'pickup') {
    setTimeout(() => {
      let newPayload = { event: 'in-transit', order: parsed.order };
      console.log('picked up order', parsed.order.id);
      socket.write(JSON.stringify(newPayload));
    }, 1000);
  }

  if (parsed.event === 'in-transit') {

    setTimeout(() => {
      let newPayload = { event: 'delivered', order: parsed.order };
      console.log('delivered order', parsed.order.id);
      socket.write(JSON.stringify(newPayload));
    }, 3000);
  }
});
