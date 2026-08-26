import { TeacherSchema } from '@/infrastructure/database/schemas/teacher-schema'
import { Teacher } from '../dtos'

export interface ITeacherRepository {
  createTeacher(institutionId: string, payload: TeacherSchema): Promise<Teacher>
  getTeachers(institutionId: string): Promise<Teacher[]>
  getTeacherById(id: string, institutionId: string): Promise<Teacher>
  updateTeacher(institutionId: string, payload: TeacherSchema, id: string): Promise<Teacher>
  deleteTeacher(id: string, institutionId: string): Promise<void>
  getTeacherByEmail(email: string): Promise<Teacher>
}