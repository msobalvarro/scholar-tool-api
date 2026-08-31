import { z } from 'zod'

export const studentSchema = z.object({
  birthday: z.iso.date(),
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  gender: z.enum(['male', 'female']),
  photo: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  direction: z.string().optional(),
  responsableId: z.string().length(24),
  courseId: z.string().length(24),
})

export type StudentSchema = z.infer<typeof studentSchema>
export type StudentUpdateSchema = z.infer<typeof studentSchema>

export const assignToCourseSchema = z.object({
  studentId: z.string().length(24),
  courseId: z.string().length(24),
})

export type AssignToCourseSchema = z.infer<typeof assignToCourseSchema>