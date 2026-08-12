import { Server } from 'socket.io'
import { Server as Engine, type WebSocketData } from '@socket.io/bun-engine'
import { Service } from 'typedi'

@Service()
export class SocketAdapter {
  public io: Server
  public engine: Engine

  constructor() {
    this.io = new Server()
    this.engine = new Engine()

    this.io.bind(this.engine)
    this.registerEvents()
  }

  private registerEvents(): void {
    this.io.on('connection', (socket) => {
      console.log(socket.id, 'connected')
    })
  }

  public handleRequest(req: Request, server: Bun.Server<WebSocketData>) {
    return this.engine.handleRequest(req, server)
  }

  public get websocketHandler() {
    return this.engine.handler().websocket
  }
}
