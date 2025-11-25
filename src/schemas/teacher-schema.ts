import { z } from 'zod'

export const teacherSchema = z.object({
  name: z.string().min(3).max(128),
  birthday: z.string(),
  phoneNumber: z.string(),
  // status: z.enum(['active', 'inactive'])
})

export type TeacherSchema = z.infer<typeof teacherSchema>

export const createTeacherSchema = teacherSchema.extend({
  institutionId: z.string()
})

export type CreateTeacherSchema = z.infer<typeof createTeacherSchema>

export const updateTeacherSchema = teacherSchema.extend({
  _id: z.string()
})

export type UpdateTeacherSchema = z.infer<typeof updateTeacherSchema>

export const deleteTeacherSchema = z.object({
  _id: z.string()
})

export type DeleteTeacherSchema = z.infer<typeof deleteTeacherSchema>
