import { z } from "zod"

export const institutionSchema = z.object({
  name: z.string().min(3).max(128),
  logo: z.string().optional()
})

export type InstitutionSchema = z.infer<typeof institutionSchema>

export const updateInstitutionSchema = institutionSchema.extend({
  _id: z.string()
})

export type UpdateInstitutionSchema = z.infer<typeof updateInstitutionSchema>

export const deleteInstitutionSchema = z.object({
  _id: z.string()
})

export type DeleteInstitutionSchema = z.infer<typeof deleteInstitutionSchema>

export const assignUserToInstitutionSchema = z.object({
  userId: z.string(),
  institutionId: z.string()
})

export type AssignUserToInstitutionSchema = z.infer<typeof assignUserToInstitutionSchema>

export const removeUserFromInstitutionSchema = z.object({
  userId: z.string(),
  institutionId: z.string()
})

export type RemoveUserFromInstitutionSchema = z.infer<typeof removeUserFromInstitutionSchema>
