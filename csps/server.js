'use strict';

const net = require('net');
const server = net.createServer();

server.listen(3000, () => {
  console.log('Server is up! WHAT?!');
}); 

//create socket pool < all the connected sockets

let socketPool = [];

//listen to connection events, and do something
//socket that is trying to connect to server 

const logger = (payload) => {
  let parsed = JSON.parse(payload.toString());

  for (let i =0; i < socketPool.length; i++) {
    let socket = socketPool[i];
    socket.write(payload);
  }

  if (parsed.event === 'pickup') {
    console.log('pickup');
    console.log('- Time:', new Date());
    console.log('- Store', parsed.order.store);
    console.log('- OrderId;', parsed.order.id);
    console.log('- Customer: ', parsed.order.name);
    console.log('Address:', parsed.order.address);
  
  }

  if (parsed.event === 'in-transit')
    console.log('In-transit order', parsed.order.id);

  if (parsed.event === 'delivered')
    console.log('Delivered order', parsed.order.id);

};

server.on('connections', (socket) => {
  console.log('socket connected to me');
  socketPool.push(socket);
  socket.on('data', logger);
});