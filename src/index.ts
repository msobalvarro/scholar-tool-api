import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { connect } from 'mongoose'
import { environments } from './utils/constanst'
import { router } from './routes'

const app = new Hono()

connect(environments.DB, { autoIndex: false })
  .then(() => console.log('Mongoose DB connected'))
  .catch((err) => console.log(err))

app.use(logger())

app.get('/', (c) => {
  return c.text('Bienvenido a la API de Scholar Tool')
})

app.route('/', router)

export default app
