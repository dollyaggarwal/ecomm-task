import { Server } from 'socket.io';
import Emitter from 'events';

const setupSocket = (server) => {
  const io = new Server(server);

  // Event emitter
  const eventEmitter = new Emitter();
  
  io.on('connection', (socket) => {
    // Join
    socket.on('join', (roomId) => {
      socket.join(roomId);
    });
  });
  eventEmitter.on("wishlistUpdated", (data) => {
    //order room
    io.to(`wishlist_${data.id}`).emit('wishlistUpdated', data);
  });
  eventEmitter.on("wishlistUpdated", (data) => {
    //admin order handler room
    io.to(`adminRoom`).emit('wishlist', data);
  });

  return eventEmitter;
};

export default setupSocket;