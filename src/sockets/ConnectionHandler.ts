import { io, Socket } from "socket.io-client";

class ConnectionHandler {
  sockets: Map<number, Socket> = new Map();

  private static instance: ConnectionHandler;

  private constructor() {}

  public static getInstance(): ConnectionHandler {
    if (!ConnectionHandler.instance)
      ConnectionHandler.instance = new ConnectionHandler();
    return ConnectionHandler.instance;
  }

  openSocket(port: number, messages: Map<string, () => void>): Socket {
    if (this.sockets.has(port)) {
      let socket = this.sockets.get(port);
      if (socket) return socket;
    }
    const socket = io(`ws://localhost:${port}`);
    socket.on("connect", () => {
      console.log(`connected to ws on port: ${port}`);
    });
    socket.on("disconnect", () => {
      console.log(`disconnected from ws on port: ${port}`);
    });
    messages.forEach((func: () => void, message: string) => {
      socket.on(message, func);
    });
    this.sockets.set(port, socket);
    return socket;
  }

  closeSocket(port: number) {
    if (this.sockets.has(port)) {
      let socket = this.sockets.get(port);
      if (socket) {
        socket.disconnect();
        this.sockets.delete(port);
      }
    }
  }

  isConnected(port: number) {
    return this.sockets.has(port);
  }
}

export default ConnectionHandler;
