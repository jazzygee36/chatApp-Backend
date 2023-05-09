import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";
import { v4 } from "uuid";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  public users: { [uid: string]: string };

  constructor(server: HTTPServer) {
    ServerSocket.instance = this;
    this.users = {};
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: "",
      },
    });
    this.io.on("connect", this.startListeners);

    console.info("Socket IO started");
  }
  startListeners = (socket: Socket) => {
    console.info("Message received from " + socket.id);

    socket.on("Handshake", () => {
      console.info("Message received from " + socket.id);
    });
    socket.on("Disconnect", () => {
      console.info("Disconnect received from " + socket.id);
    });
  };
}
