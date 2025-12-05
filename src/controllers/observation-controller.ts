import { ObservationSchema, observationSchema } from '@/schemas/observation-schema';
import { observationService } from '@/services/observation-service';
import { ErrorValidator } from '@/utils/error-validator';
import { Context } from 'hono';

class ObservationController {
  async createObservation(c: Context) {
    try {
      const body = await c.req.json()
      const payload = observationSchema.parse(body) as ObservationSchema
      const teacher = c.get('jwtPayload')

      const observationCreated = await observationService.createObservation(payload, teacher._id)

      return c.json(observationCreated)

    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const observationController = new ObservationController()