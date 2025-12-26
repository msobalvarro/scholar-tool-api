import { z } from 'zod'

export const teacherSchema = z.object({
  name: z.string().min(3).max(128),
  birthday: z.string(),
  phoneNumber: z.string(),
  email: z.email()
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

export const teacherPhotoSchema = z.object({
  imageName: z.string(),
})

export type TeacherPhotoSchema = z.infer<typeof teacherPhotoSchema>
