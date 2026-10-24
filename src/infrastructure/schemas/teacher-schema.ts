import { z } from 'zod'

export const teacherSchema = z.object({
  name: z.string().min(3).max(128),
  birthday: z.string().optional(),
  phoneNumber: z.string(),
  email: z.email(),
  status: z.enum(['active', 'inactive']).optional(),
  asignatureIds: z.array(z.string()).default([]),
  courseIds: z.array(z.string()).default([]),
})

export type TeacherSchema = z.infer<typeof teacherSchema>

export const deleteTeacherSchema = z.object({
  _id: z.string()
})

export type DeleteTeacherSchema = z.infer<typeof deleteTeacherSchema>

export const teacherPhotoSchema = z.object({
  imageName: z.string(),
})

export type TeacherPhotoSchema = z.infer<typeof teacherPhotoSchema>
