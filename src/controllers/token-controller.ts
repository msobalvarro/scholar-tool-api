import { TokenSchema, tokenSchema } from '@/infrastructure/database/schemas/token-schema'
import { TokenService } from '@/services/token-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class TokenController {
  constructor(private tokenService: TokenService) { }

  createTokenStudent = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = await tokenSchema.parse(body)
      const user = c.get('jwtPayload')
      const tokenCreated = await this.tokenService.createTokenStudent(
        user._id,
        parsedBody.token,
        user.institutionId
      )
      return c.json(tokenCreated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  createTokenResponsable = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = await tokenSchema.parse(body) as TokenSchema
      const user = c.get('jwtPayload')
      const tokenCreated = await this.tokenService.createTokenResponsable(
        user._id,
        parsedBody.token,
        user.institutionId
      )
      return c.json(tokenCreated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  removeToken = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = await tokenSchema.parse(body) as TokenSchema
      const tokenRemoved = await this.tokenService.removeToken(parsedBody.token)
      return c.json(tokenRemoved)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}
