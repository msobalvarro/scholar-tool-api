import { z } from 'zod'

export const enrollmentSchema = z.object({
  coursesId: z.array(z.string()),
  name: z.string(),
  year: z.number().int(),
  enrolementPrice: z.number(),
  monthlyPaymentPrice: z.number(),
})

export type EnrollmentInput = z.infer<typeof enrollmentSchema>

export const enrollmentUpdateSchema = enrollmentSchema.extend({
  _id: z.string(),
})

export type EnrollmentUpdateInput = z.infer<typeof enrollmentUpdateSchema>