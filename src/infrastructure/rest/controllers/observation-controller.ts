import { ObservationSchema, observationSchema } from '@/infrastructure/database/schemas/observation-schema'
import { ObservationService } from '@/infrastructure/database/repositories/observation-repository'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class ObservationController {
  constructor(private observationService: ObservationService) { }
  createObservation = async (c: Context) => {
    const body = await c.req.json()
    const payload = observationSchema.parse(body) as ObservationSchema
    const teacher = c.get('jwtPayload')

    const observationCreated = await this.observationService.createObservation(payload, teacher._id)

    return c.json(observationCreated)
  }
}