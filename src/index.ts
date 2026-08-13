import 'reflect-metadata'
import { Container } from 'typedi'
import { ORM } from '@/infrastructure/database'
import type { WebSocketData } from '@socket.io/bun-engine'
import { SocketAdapter } from '@/infrastructure/adapters/socket'
import { createApp } from '@/infrastructure/rest/app'
import { environments } from './utils/constanst'

const orm = Container.get(ORM)
await orm.connectDB()

const app = createApp()
const socketAdapter = Container.get(SocketAdapter)

export default {
  port: Number(environments.PORT),
  idleTimeout: 30,

  fetch(req: Request, server: Bun.Server<WebSocketData>) {
    const url = new URL(req.url)

    if (url.pathname === '/socket.io/') {
      return socketAdapter.handleRequest(req, server)
    }

    return app.fetch(req, server)
  },

  websocket: socketAdapter.websocketHandler
}
