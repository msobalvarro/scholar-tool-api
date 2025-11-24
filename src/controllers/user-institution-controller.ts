import { CreateUserInstitutionSchema, createUserInstitutionSchema } from '@/schemas/user-institution-schema'
import { userInstitutionService } from '@/services/user-institution-service'
import { Context } from 'hono'

class InstitutionController {
  async createUserInstitution(c: Context) {
    const body = await c.req.json()
    const parsedBody = createUserInstitutionSchema.parse(body) as CreateUserInstitutionSchema

    const userInstitution = await userInstitutionService.createUserInstitution(parsedBody)

    return c.json(userInstitution)
  }
}