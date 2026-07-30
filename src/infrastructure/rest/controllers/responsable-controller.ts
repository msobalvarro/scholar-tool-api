import {
  ResponsablePersonSchema,
  ResponsablePersonUpdate,
  responsableSchema
} from '@/infrastructure/database/schemas/responsable-schema'
import { Context } from 'hono'
import { ResponsableRepository } from '@/infrastructure/database/repositories/responsable-repository'
import { Inject, Service } from 'typedi'

@Service()
export class ResponsableController {
  @Inject(() => ResponsableRepository)
  private responsableRepository!: ResponsableRepository

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = responsableSchema.parse(body) as ResponsablePersonSchema

    const responsable = await this.responsableRepository.createResponsable(parsedBody)

    return c.json(responsable)
  }

  update = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = responsableSchema.parse(body) as ResponsablePersonUpdate

    const responsable = await this.responsableRepository.updateResponsable(parsedBody)

    return c.json(responsable)
  }

  delete = async (c: Context) => {
    const { _id } = await c.req.json()
    const responsable = await this.responsableRepository.deleteResponsable(_id)
    return c.json(responsable)
  }

  getAll = async (c: Context) => {
    const responsables = await this.responsableRepository.getAllResponsables()
    return c.json(responsables)
  }

  search = async (c: Context) => {
    const { q } = await c.req.query()
    if (!q) throw new Error('Query is required')
    const responsable = await this.responsableRepository.searchResponsable(q)
    return c.json(responsable)
  }

  getById = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    const responsable = await this.responsableRepository.getResponsableById(id)
    return c.json(responsable)
  }
}