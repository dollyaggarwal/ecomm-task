//dotenv setup
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./configuration/db.js";
import app from "./app.js";
import setupSocket from "./middlewares/socket.js";


connectDB()
  .then(() => {
   const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on PORT : ${process.env.PORT || 8000}`);
    });
    const eventEmitter = setupSocket(server);
    app.set("eventEmitter", eventEmitter);
  })
  .catch((err) => {
    console.log("MONGDB connection failed!!!", err);
  });