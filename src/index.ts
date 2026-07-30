import 'reflect-metadata'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { router } from './routes'
import { z } from 'zod'
import { Container } from 'typedi'
import { ORM } from './infrastructure/database'
import { ErrorValidator } from './utils/error-validator'

z.config(z.locales.es())
const app = new Hono()
const orm = Container.get(ORM)

orm.connectDB()

app.use(logger())
app.use(cors({ origin: '*' }))

app.get('/', (c) => {
  return c.text(`api running`)
})

app.onError((err, c) => {
  return ErrorValidator(err, c)
})

app.route('/', router)

export default app
