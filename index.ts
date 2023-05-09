import express, { application } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const Port = process.env.PORT || 5000;
import mongoose from "mongoose";
import indexRouter from "./server/loginAuth/login.routes";
import { config } from "./server/config/config";
import http from "http";
import { ServerSocket } from "./socket";
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => console.log("Connected!"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());
app.use("/api", indexRouter);

// io.on("connection", (socket: any) => {
//   socket.on("chat message", (msg: any) => {
//     io.emit("chat message", msg);
//   });
// });
const httpServer = http.createServer(application);
new ServerSocket(httpServer);
app.listen(Port, () => {
  console.log(`Server running on localhost${Port}`);
});
