import { jwt } from 'hono/jwt'
import { environments } from './constanst'


export const jwtUserRoot = jwt({ secret: environments.JWT_SECRET_ADMIN })
export const jwtUser = jwt({ secret: environments.JWT_SECRET_USER })
