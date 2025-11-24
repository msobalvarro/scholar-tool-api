import { z } from 'zod'

export const teacherSchema = z.object({
  name: z.string().min(3).max(128),
  birthday: z.date(),
  phoneNumber: z.string().min(10).max(15),
  // status: z.enum(['active', 'inactive'])
})

export type TeacherSchema = z.infer<typeof teacherSchema>

export const updateTeacherSchema = teacherSchema.extend({
  _id: z.string()
})

export type UpdateTeacherSchema = z.infer<typeof updateTeacherSchema>

export const deleteTeacherSchema = z.object({
  _id: z.string()
})

export type DeleteTeacherSchema = z.infer<typeof deleteTeacherSchema>
