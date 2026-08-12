import 'reflect-metadata'
import { Container } from 'typedi'
import { ORM } from '@/infrastructure/database'
import type { WebSocketData } from '@socket.io/bun-engine'
import { SocketAdapter } from '@/infrastructure/adapters/socket'
import { createApp } from '@/infrastructure/rest/app'

const orm = Container.get(ORM)
await orm.connectDB()

const app = createApp()
const socketAdapter = Container.get(SocketAdapter)

export default {
  port: 3000,
  idleTimeout: 30, // must be greater than the "pingInterval" option of the engine

  fetch(req: Request, server: Bun.Server<WebSocketData>) {
    const url = new URL(req.url)

    if (url.pathname === '/socket.io/') {
      return socketAdapter.handleRequest(req, server)
    }

    return app.fetch(req, server)
  },

  websocket: socketAdapter.websocketHandler
}
