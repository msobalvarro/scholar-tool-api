import { ObservationSchema, observationSchema } from '@/infrastructure/schemas/observation-schema'
import { ObservationService } from '@/core/services/observation-service'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class ObservationController {
  constructor(private observationService: ObservationService) { }
  createObservation = async (c: Context) => {
    const body = await c.req.json()
    const payload = observationSchema.parse(body) as ObservationSchema
    const teacher = c.get('jwtPayload')
    return c.json(
      await this.observationService.createObservation(payload, teacher._id)
    )
  }
}