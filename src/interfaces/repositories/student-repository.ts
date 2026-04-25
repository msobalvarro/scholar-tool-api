import { Student, StudentUpdate } from "@/schemas/student-schema";
import { UpdateWriteOpResult } from 'mongoose';

export interface IStudentRepository {
  createStudent(student: Student, institutionId: string): Promise<Student>
  updateStudent(student: StudentUpdate, institutionId: string, studentId: string): Promise<UpdateWriteOpResult>
  deleteStudent(studentId: string, institutionId: string): Promise<Student>
  getAllStudents(institutionId: string): Promise<Student[]>
  getAllStudentsByCourse(courseId: string, institutionId: string): Promise<Student[]>
  assignStudentToCourse(courseId: string, studentId: string, institutionId: string): Promise<Student>
  getStudentById(studentId: string, institutionId: string): Promise<Student>
}