import {
  AsignatureSchema,
  asignatureSchema
} from '@/infrastructure/schemas/asignature-schema'
import { AsignatureService } from '@/core/services/asignature-service'
import { Context } from 'hono'
import { Service, Inject } from 'typedi'

@Service()
export class AsignatureController {
  @Inject(() => AsignatureService)
  private asignatureService!: AsignatureService

  createAsignature = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = await asignatureSchema.parse(body) as AsignatureSchema
    const user = c.get('jwtPayload')
    return c.json(await this.asignatureService.createAsignature(parsedBody, user.institutionId))
  }

  getAsignatureById = async (c: Context) => {
    const id = c.req.param('id')
    return c.json(await this.asignatureService.getAsignatureById(id))
  }

  updateAsignature = async (c: Context) => {
    const body = await c.req.json()
    const id = c.req.param('id')
    const parsedBody = await asignatureSchema.parse(body) as AsignatureSchema
    return c.json(await this.asignatureService.updateAsignature(parsedBody, id))
  }

  deleteAsignature = async (c: Context) => {
    const id = c.req.param('id')
    return c.json(await this.asignatureService.deleteAsignature(id))
  }

  getAllAsignatures = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(await this.asignatureService.getAllAsignatures(user.institutionId))
  }

  getAsignaturesByTeacher = async (c: Context) => {
    const user = c.get('jwtPayload')
    console.log(user)
    return c.json(await this.asignatureService.getAsignaturesByTeacher(user._id, user.institutionId))
  }
}