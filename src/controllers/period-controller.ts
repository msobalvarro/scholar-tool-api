import { Context } from "hono"
import { ErrorValidator } from "@/utils/error-validator"
import { periodService } from "@/services/period-service"
import { PeriodUpdateSchema, PeriodSchema } from "@/schemas/period-schema"
import { PeriodUpdate, Period } from "@/schemas/period-schema"

class PeriodController {
  async create(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = PeriodSchema.parse(body) as Period
      const user = c.get('jwtPayload')

      const period = await periodService.createPeriod(parsedBody, user.institutionId)

      return c.json(period)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async update(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = PeriodUpdateSchema.parse(body) as PeriodUpdate
      const period = await periodService.updatePeriod(parsedBody)

      return c.json(period)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async delete(c: Context) {
    try {
      const { _id } = await c.req.json()
      const period = await periodService.deletePeriod(_id)
      return c.json(period)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }


  async getById(c: Context) {
    try {
      const { id } = await c.req.param() as { id: string }

      if (!id) throw 'Periodo no encontrado'

      const period = await periodService.getPeriodById(id)
      return c.json(period)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getPeriodsByInstitution(c: Context) {
    try {
      const user = c.get('jwtPayload')
      const periods = await periodService.getPeriodsByInstitution(user.institutionId)
      return c.json(periods)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const periodController = new PeriodController()