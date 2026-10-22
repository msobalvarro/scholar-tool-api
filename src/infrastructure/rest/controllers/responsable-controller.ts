import {
  ResponsablePersonSchema,
  ResponsablePersonUpdate,
  responsableSchema
} from '@/infrastructure/schemas/responsable-schema'
import { Context } from 'hono'
import { ResponsableRepository } from '@/core/services/responsable-service'
import { Inject, Service } from 'typedi'

@Service()
export class ResponsableController {
  @Inject(() => ResponsableRepository)
  private responsableRepository!: ResponsableRepository

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = responsableSchema.parse(body) as ResponsablePersonSchema
    return c.json(
      await this.responsableRepository.createResponsable(parsedBody)
    )
  }

  update = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = responsableSchema.parse(body) as ResponsablePersonUpdate
    return c.json(
      await this.responsableRepository.updateResponsable(parsedBody)
    )
  }

  delete = async (c: Context) => {
    const { _id } = await c.req.json()
    return c.json(await this.responsableRepository.deleteResponsable(_id))
  }

  getAll = async (c: Context) => {
    return c.json(
      await this.responsableRepository.getAllResponsables()
    )
  }

  search = async (c: Context) => {
    const { q } = await c.req.query()
    if (!q) throw new Error('Query is required')
    return c.json(
      await this.responsableRepository.searchResponsable(q)
    )
  }

  getById = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    return c.json(
      await this.responsableRepository.getResponsableById(id)
    )
  }
}