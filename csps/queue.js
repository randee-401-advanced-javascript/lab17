'use strict';

const io = require('socket.io')(3001);

let queue = {
  feed: [],
  pullet: [],
};

io.on('connection', (socket) => {
  console.log('connected to', socket.id);

  socket.on('pickup', (payload) => {
    if(payload.type === 'feedStore') {
      queue.feed.push(payload.number);
      io.to('feed').emit('current-orders', queue.feed);
    } else if (payload.type === 'pulletStore') {
      queue.pullet.push(payload.number);
      io.to('pullet').emit('current-orders', queue.pullet);
    }
  });

  socket.on('in-transit', (payload) => {
    if (payload === 'feedStore') {
      socket.join('feed');
      socket.emit('current-orders', queue.feed);
      } else if (payload === pulletStore) {
      socket.join('pullet');
      socket.emit('current-orders', queue.pullet);
      }
    });

    // not sure if this is needed. still need the functions that shift() off the arrays. Looking into how we do that for this lab.

  socket.on('delivered', (payload) => {
    if(payload === 'feedStore') {
      socket.join('feed');
      socket.emit('current-orders', queue.feed);
    } else if (payload === pulletStore) {
      socket.join('pullet');
      socket.emit('current-orders', queue.pullet);
    }
  })
})