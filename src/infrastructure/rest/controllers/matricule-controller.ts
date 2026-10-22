import { matriculeSchema, MatriculeSchema, MatriculeUpdateSchema } from '@/infrastructure/schemas/matricule-schema'
import { MatriculeRepository } from '@/core/services/matrciule-service'
import { Context } from 'hono'
import { Service } from 'typedi'
@Service()
export class MatriculeController {
  constructor(private matriculeService: MatriculeRepository) { }

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = matriculeSchema.parse(body) as MatriculeSchema
    const user = c.get('jwtPayload')
    return c.json(
      await this.matriculeService.createMatricule(parsedBody, user.institutionId)
    )
  }

  update = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = matriculeSchema.parse(body) as MatriculeUpdateSchema
    return c.json(
      await this.matriculeService.updateMatricule(parsedBody)
    )
  }

  delete = async (c: Context) => {
    const { _id } = await c.req.json()
    return c.json(
      await this.matriculeService.deleteMatricule(_id)
    )
  }

  getAll = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(
      await this.matriculeService.getAllMatricules(user.institutionId)
    )
  }

  getById = async (c: Context) => {
    const { _id } = await c.req.json()
    return c.json(
      await this.matriculeService.getMatriculeById(_id)
    )
  }
}
