import { ClientSession } from 'mongoose'
import { TeacherAuth } from '../dtos'

export interface IAuthTeacherRepository {
  createTeacherAuth(teacherId: string, password: string, session?: ClientSession): Promise<TeacherAuth>
  getAllTeacherAuth(institutionId: string): Promise<TeacherAuth[]>
  updatePassword(teacherId: string, password: string): Promise<TeacherAuth>
}
