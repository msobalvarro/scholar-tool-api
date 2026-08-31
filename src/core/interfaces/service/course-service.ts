import { CreateCourseDto as CourseSchema } from '@/infrastructure/schemas/course-schema'
import { Course as CourseDto, Student } from '../dtos'

export interface ICourseRepository {
  createCourse(course: CourseSchema, institutionId: string): Promise<CourseDto>
  updateCourse(course: CourseSchema, _id: string): Promise<void>
  deleteCourse(courseId: string): Promise<void>
  getAllCourses(institutionId: string): Promise<CourseDto[]>
  getCourseById(courseId: string): Promise<CourseDto | null>
  getActiveCourse(courseId: string): Promise<CourseDto>

  /**
   * Retorna todos los Cursos disponibles que no tengan ningun enrollment
   * 
   * @param institutionId Id de la institución
   * @param enrollmentId Id de la matrícula
   * @returns Cursos disponibles
   */
  getAllCoursesNotInEnrollment(institutionId: string): Promise<CourseDto[]>

  /**
   * Retorna todos los estudiantes de un curso
   * 
   * @param courseId Id del curso
   * @returns Estudiantes del curso
   */
  getAllStudentsByCourse(courseId: string): Promise<Student[]>
}
