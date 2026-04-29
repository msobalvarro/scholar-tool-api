import { StudentSchema, StudentUpdateSchema } from "@/infrastructure/database/schemas/student-schema";
import { UpdateWriteOpResult } from 'mongoose';

export interface IStudentRepository {
  createStudent(student: StudentSchema, institutionId: string): Promise<StudentSchema>
  updateStudent(student: StudentUpdateSchema, institutionId: string, studentId: string): Promise<UpdateWriteOpResult>
  deleteStudent(studentId: string, institutionId: string): Promise<StudentSchema>
  getAllStudents(institutionId: string): Promise<StudentSchema[]>
  getAllStudentsByCourse(courseId: string, institutionId: string): Promise<StudentSchema[]>
  assignStudentToCourse(courseId: string, studentId: string, institutionId: string): Promise<StudentSchema>
  getStudentById(studentId: string, institutionId: string): Promise<StudentSchema>
}