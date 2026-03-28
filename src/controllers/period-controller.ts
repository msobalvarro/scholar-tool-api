import { Context } from "hono"
import { ErrorValidator } from "@/utils/error-validator"
import { PeriodService } from "@/services/period-service"
import { PeriodUpdateSchema, PeriodSchema } from "@/schemas/period-schema"
import { PeriodUpdate, Period } from "@/schemas/period-schema"
import { Service } from 'typedi'
@Service()
export class PeriodController {
  constructor(private periodService: PeriodService) { }
   create = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = PeriodSchema.parse(body) as Period
      const user = c.get('jwtPayload')

      const period = await this.periodService.createPeriod(parsedBody, user.institutionId)

      return c.json(period)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   update = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = PeriodUpdateSchema.parse(body) as PeriodUpdate
      const period = await this.periodService.updatePeriod(parsedBody)

      return c.json(period)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   delete = async (c: Context) => {
    try {
      const { _id } = await c.req.json()
      const period = await this.periodService.deletePeriod(_id)
      return c.json(period)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }


   getById = async (c: Context) => {
    try {
      const { id } = await c.req.param() as { id: string }

      if (!id) throw 'Periodo no encontrado'

      const period = await this.periodService.getPeriodById(id)
      return c.json(period)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

   getPeriodsByInstitution = async (c: Context) => {
    try {
      const user = c.get('jwtPayload')
      const periods = await this.periodService.getPeriodsByInstitution(user.institutionId)
      return c.json(periods)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}