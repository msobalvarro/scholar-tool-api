import {
  AsignatureSchema,
  asignatureSchema,
  AsignatureUpdateSchema,
  asignatureUpdateSchema
} from '@/schemas/asignature-schema'
import { asignatureService } from '@/services/asignature-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'

class AsignatureController {
  async createAsignature(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = await asignatureSchema.parse(body) as AsignatureSchema
      const user = c.get('jwtPayload')
      const asignatureCreated = await asignatureService.createAsignature(parsedBody, user.institutionId)
      return c.json(asignatureCreated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getAsignatureById(c: Context) {
    try {
      const id = c.req.param('id')
      const asignature = await asignatureService.getAsignatureById(id)
      return c.json(asignature)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async updateAsignature(c: Context) {
    try {
      const body = await c.req.json()
      const id = c.req.param('id')
      const parsedBody = await asignatureSchema.parse(body) as AsignatureSchema
      const asignatureUpdated = await asignatureService.updateAsignature(parsedBody, id)
      return c.json(asignatureUpdated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async deleteAsignature(c: Context) {
    try {
      const id = c.req.param('id')
      const asignatureDeleted = await asignatureService.deleteAsignature(id)
      return c.json(asignatureDeleted)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getAllAsignatures(c: Context) {
    try {
      const user = c.get('jwtPayload')
      const asignatures = await asignatureService.getAllAsignatures(user.institutionId)
      return c.json(asignatures)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const asignatureController = new AsignatureController()