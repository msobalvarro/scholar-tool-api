import { Server } from 'socket.io'
import { Server as Engine, type WebSocketData } from '@socket.io/bun-engine'
import { Service } from 'typedi'
import { verify } from 'hono/jwt'
import { environments } from '@/utils/constanst'

@Service()
export class SocketAdapter {
  public io: Server
  public engine: Engine

  constructor() {
    this.io = new Server()
    this.engine = new Engine()

    this.io.bind(this.engine)
    this.registerMiddlewares()
    this.registerEvents()
  }

  private registerMiddlewares(): void {
    this.io.use(async (socket, next) => {
      try {
        const authHeader = socket.handshake.headers.authorization
        const authParam = socket.handshake.auth?.token || socket.handshake.auth?.authorization

        let token = authParam || authHeader

        if (token && typeof token === 'string' && token.startsWith('Bearer ')) {
          token = token.slice(7).trim()
        }

        if (!token || typeof token !== 'string') {
          return next(new Error('Authentication error: Token is required'))
        }

        // TODO: Agregar mas secret key si 
        // es necesario en un futuro
        const secrets = [
          environments.JWT_SECRET_USER_STUDENT,
        ].filter(Boolean) as string[]

        let payload = null

        for (const secret of secrets) {
          try {
            payload = await verify(token, secret)
            if (payload) break
          } catch (error) {
            console.log(`[registerMiddlewares] Token no valido: ${error}`)
          }
        }

        if (!payload) {
          return next(new Error('Authentication error: Invalid or expired token'))
        }

        socket.data.user = payload
        next()
      } catch (error) {
        next(new Error('Authentication error: ' + (error instanceof Error ? error.message : 'Unknown error')))
      }
    })
  }

  private registerEvents(): void {
    this.io.on('connection', (socket) => {
      console.log(socket.id, 'connected | User:', socket.data.user)
    })
  }

  public handleRequest(req: Request, server: Bun.Server<WebSocketData>) {
    return this.engine.handleRequest(req, server)
  }

  public get websocketHandler() {
    return this.engine.handler().websocket
  }
}

