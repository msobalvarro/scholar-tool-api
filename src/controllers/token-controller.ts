import { TokenSchema, tokenSchema } from '@/schemas/token-schema'
import { tokenService } from '@/services/token-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'

class TokenController {
  async createTokenStudent(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = await tokenSchema.parse(body) as TokenSchema
      const user = c.get('jwtPayload')
      const tokenCreated = await tokenService.createTokenStudent(
        user._id,
        parsedBody.token,
        user.institutionId
      )
      return c.json(tokenCreated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async createTokenResponsable(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = await tokenSchema.parse(body) as TokenSchema
      const user = c.get('jwtPayload')
      const tokenCreated = await tokenService.createTokenResponsable(
        user._id,
        parsedBody.token,
        user.institutionId
      )
      return c.json(tokenCreated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async removeToken(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = await tokenSchema.parse(body) as TokenSchema
      const tokenRemoved = await tokenService.removeToken(parsedBody.token)
      return c.json(tokenRemoved)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const tokenController = new TokenController()
