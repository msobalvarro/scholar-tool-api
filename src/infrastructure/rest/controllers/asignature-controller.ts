import {
  AsignatureSchema,
  asignatureSchema
} from '@/infrastructure/database/schemas/asignature-schema'
import { AsignatureRepository } from '@/infrastructure/database/repositories/asignature-repository'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service, Inject, Inject } from 'typedi'

@Service()
export class AsignatureController {
  @Inject(() => AsignatureRepository)
  private asignatureService!: AsignatureRepository

  createAsignature = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = await asignatureSchema.parse(body) as AsignatureSchema
      const user = c.get('jwtPayload')
      const asignatureCreated = await this.asignatureService.createAsignature(parsedBody, user.institutionId)
      return c.json(asignatureCreated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAsignatureById = async (c: Context) => {
    try {
      const id = c.req.param('id')
      const asignature = await this.asignatureService.getAsignatureById(id)
      return c.json(asignature)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  updateAsignature = async (c: Context) => {
    try {
      const body = await c.req.json()
      const id = c.req.param('id')
      const parsedBody = await asignatureSchema.parse(body) as AsignatureSchema
      const asignatureUpdated = await this.asignatureService.updateAsignature(parsedBody, id)
      return c.json(asignatureUpdated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  deleteAsignature = async (c: Context) => {
    try {
      const id = c.req.param('id')
      const asignatureDeleted = await this.asignatureService.deleteAsignature(id)
      return c.json(asignatureDeleted)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAllAsignatures = async (c: Context) => {
    try {
      const user = c.get('jwtPayload')
      const asignatures = await this.asignatureService.getAllAsignatures(user.institutionId)
      return c.json(asignatures)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}