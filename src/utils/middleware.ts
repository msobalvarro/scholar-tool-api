import { Context, Next } from 'hono'
import * as jwt from 'jsonwebtoken'
import { environments } from '@/utils/constanst'

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Token requerido' }, 401)
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, environments.JWT_SECRET)
    c.set('user', decoded)
    await next()
  } catch (err) {
    return c.json({ error: 'Token inválido o expirado' }, 401)
  }
}
