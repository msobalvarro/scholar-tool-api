import { z } from 'zod'

export const courseSchema = z.object({
  name: z.string(),
  groupName: z.string(),
  teacherLeadId: z.string().length(24),
  order: z.number(),
  breakTime: z.string()
})

export type CreateCourseDto = z.infer<typeof courseSchema>
