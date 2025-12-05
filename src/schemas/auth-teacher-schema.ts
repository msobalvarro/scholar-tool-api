import { z } from 'zod'

export const authTeacherSchema = z.object({
  teacherId: z.string(),
  password: z.string(),
})

export type AuthTeacherSchema = z.infer<typeof authTeacherSchema>
