import { Context } from 'hono'
import { BlankEnv, BlankInput } from 'hono/types'
import { z, ZodError } from 'zod'

export const ErrorValidator = (err: unknown, c: Context) => {
  if (err instanceof ZodError) {
    return c.json({ message: err.issues[0].message }, 400)
  }

  return c.json({ message: String(err) }, 500)
}