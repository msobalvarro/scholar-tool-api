import { Hono } from 'hono'
import { connect } from 'mongoose'
import { environments } from './utils/constanst'

const app = new Hono()

connect(environments.DB, { autoIndex: false })
  .then(() => console.log('Mongoose DB connected'))
  .catch((err) => console.log(err))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
