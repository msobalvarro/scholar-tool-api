import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { connect } from 'mongoose'
import { environments } from './utils/constanst'
import { router } from './routes'

const app = new Hono()

connect(environments.DB, { autoIndex: false })
  .then(() => console.log('Mongoose DB connected'))
  .catch((err) => console.log(err))

app.use(logger())
app.use(cors({ origin: '*' }))

app.get('/', (c) => {
  return c.text(`api running`)
})

app.route('/', router)

export default app
