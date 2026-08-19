import { AssignToCourseSchema, StudentSchema, StudentUpdateSchema } from "@/infrastructure/database/schemas/student-schema";
import { UpdateWriteOpResult } from 'mongoose';
import { ResponsablePerson, Student } from '../dtos';

export interface IStudentRepository {
  createStudent(student: StudentSchema, institutionId: string): Promise<Student>
  updateStudent(student: StudentUpdateSchema, institutionId: string, studentId: string): Promise<UpdateWriteOpResult>
  deleteStudent(studentId: string, institutionId: string): Promise<void>
  getAllStudents(institutionId: string): Promise<Student[]>
  getAllStudentsByCourse(courseId: string, institutionId: string): Promise<Student[]>
  assignStudentToCourse({ courseId, studentId }: AssignToCourseSchema, institutionId: string): Promise<void>
  getStudentById(studentId: string, institutionId: string): Promise<Student | null>
  getActiveStudent(studentId: string, institutionId: string): Promise<Student | null>

  /**
   * Obtiene el responsable de un estudiante
   */
  getStudentResponsable(studentId: string, institutionId: string): Promise<ResponsablePerson>
}