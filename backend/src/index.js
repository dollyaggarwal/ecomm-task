//dotenv setup
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./configuration/db.js";
import app from "./app.js";
import WebSocket from 'ws';
import http from 'http';
const httpServer = http.createServer(app); 
// Create a WebSocket server
const wss = new WebSocket.Server({ server: httpServer }); // httpServer is your existing server instance

// Store the WebSocket server instance to use in the controllers
app.set('wsServer', wss);

// Broadcast to all clients when a wishlist is updated
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on PORT : ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MONGDB connection failed!!!", err);
  });