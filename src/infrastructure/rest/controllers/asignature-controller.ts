import {
  AsignatureSchema,
  asignatureSchema
} from '@/infrastructure/schemas/asignature-schema'
import { AsignatureRepository } from '@/core/services/asignature-service'
import { Context } from 'hono'
import { Service, Inject } from 'typedi'

@Service()
export class AsignatureController {
  @Inject(() => AsignatureRepository)
  private asignatureService!: AsignatureRepository

  createAsignature = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = await asignatureSchema.parse(body) as AsignatureSchema
    const user = c.get('jwtPayload')
    const asignatureCreated = await this.asignatureService.createAsignature(parsedBody, user.institutionId)
    return c.json(asignatureCreated)
  }

  getAsignatureById = async (c: Context) => {
    const id = c.req.param('id')
    const asignature = await this.asignatureService.getAsignatureById(id)
    return c.json(asignature)
  }

  updateAsignature = async (c: Context) => {
    const body = await c.req.json()
    const id = c.req.param('id')
    const parsedBody = await asignatureSchema.parse(body) as AsignatureSchema
    const asignatureUpdated = await this.asignatureService.updateAsignature(parsedBody, id)
    return c.json(asignatureUpdated)
  }

  deleteAsignature = async (c: Context) => {
    const id = c.req.param('id')
    const asignatureDeleted = await this.asignatureService.deleteAsignature(id)
    return c.json(asignatureDeleted)
  }

  getAllAsignatures = async (c: Context) => {
    const user = c.get('jwtPayload')
    const asignatures = await this.asignatureService.getAllAsignatures(user.institutionId)
    return c.json(asignatures)
  }
}