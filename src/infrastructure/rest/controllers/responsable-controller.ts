import {
  ResponsablePersonSchema,
  ResponsablePersonUpdate,
  responsableSchema
} from '@/infrastructure/database/schemas/responsable-schema'
import { Context } from 'hono'
import { ErrorValidator } from '@/utils/error-validator'
import { ResponsableRepository } from '@/infrastructure/database/repositories/responsable-repository'
import { Inject, Service } from 'typedi'
@Service()
export class ResponsableController {
  @Inject(() => ResponsableRepository)
  private responsableRepository!: ResponsableRepository

  create = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = responsableSchema.parse(body) as ResponsablePersonSchema

      const responsable = await this.responsableRepository.createResponsable(parsedBody)

      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  update = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = responsableSchema.parse(body) as ResponsablePersonUpdate

      const responsable = await this.responsableRepository.updateResponsable(parsedBody)

      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  delete = async (c: Context) => {
    try {
      const { _id } = await c.req.json()
      const responsable = await this.responsableRepository.deleteResponsable(_id)
      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAll = async (c: Context) => {
    try {
      const responsables = await this.responsableRepository.getAllResponsables()
      return c.json(responsables)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  search = async (c: Context) => {
    try {
      const { q } = await c.req.query()
      if (!q) throw new Error('Query is required')
      const responsable = await this.responsableRepository.searchResponsable(q)
      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getById = async (c: Context) => {
    try {
      const { id } = await c.req.param() as { id: string }
      const responsable = await this.responsableRepository.getResponsableById(id)
      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}