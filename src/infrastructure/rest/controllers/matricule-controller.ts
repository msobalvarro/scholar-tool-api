import { matriculeSchema, Matricule, MatriculeUpdate } from '@/infrastructure/database/schemas/matricule-schema'
import { MatriculeService } from '@/infrastructure/database/repositories/matrciule-repository'
import { Context } from 'hono'
import { Service } from 'typedi'
@Service()
export class MatriculeController {
  constructor(private matriculeService: MatriculeService) { }

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = matriculeSchema.parse(body) as Matricule
    const user = c.get('jwtPayload')

    const matricule = await this.matriculeService.createMatricule(parsedBody, user.institutionId)

    return c.json(matricule)
  }

  update = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = matriculeSchema.parse(body) as MatriculeUpdate

    const matricule = await this.matriculeService.updateMatricule(parsedBody)

    return c.json(matricule)
  }

  delete = async (c: Context) => {
    const { _id } = await c.req.json()
    const matricule = await this.matriculeService.deleteMatricule(_id)
    return c.json(matricule)
  }

  getAll = async (c: Context) => {
    const user = c.get('jwtPayload')
    const matricules = await this.matriculeService.getAllMatricules(user.institutionId)
    return c.json(matricules)
  }

  getById = async (c: Context) => {
    const { _id } = await c.req.json()
    const matricule = await this.matriculeService.getMatriculeById(_id)
    return c.json(matricule)
  }
}
