import { z } from 'zod'

export const createUserInstitutionSchema = z.object({
  name: z.string().min(3).max(128),
  email: z.string(),
  password: z.string().min(8).max(128),
})

export type CreateUserInstitutionSchema = z.infer<typeof createUserInstitutionSchema>

export const updateUserInstitutionSchema = createUserInstitutionSchema.extend({
  _id: z.string()
})

export type UpdateUserInstitutionSchema = z.infer<typeof updateUserInstitutionSchema>

export const deleteUserInstitutionSchema = z.object({
  _id: z.string()
})

export type DeleteUserInstitutionSchema = z.infer<typeof deleteUserInstitutionSchema>
