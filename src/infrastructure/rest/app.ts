import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { z } from 'zod'
import { router } from '@/routes'
import { ErrorValidator } from '@/utils/error-validator'

z.config(z.locales.es())

export const createApp = (): Hono => {
  const app = new Hono()

  app.use(logger())
  app.use(cors({ origin: '*' }))

  app.get('/', (c) => {
    return c.text('api running')
  })

  app.onError((err, c) => {
    return ErrorValidator(err, c)
  })

  app.route('/', router)

  return app
}
