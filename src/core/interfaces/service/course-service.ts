import { CreateCourseDto as CourseSchema } from '@/infrastructure/database/schemas/course-schema'
import { Course as CourseDto } from '../dtos'

export interface ICourseRepository {
  createCourse(course: CourseSchema, institutionId: string): Promise<CourseDto>
  updateCourse(course: CourseSchema, _id: string): Promise<any>
  deleteCourse(courseId: string): Promise<any>
  getAllCourses(institutionId: string): Promise<any[]>
  getCourseById(courseId: string): Promise<CourseDto | null>

  /**
   * Retorna todos los Cursos disponibles que no tengan ningun enrollment
   * 
   * @param institutionId Id de la institución
   * @param enrollmentId Id de la matrícula
   * @returns Cursos disponibles
   */
  getAllCoursesNotInEnrollment(institutionId: string): Promise<CourseDto[]>
}
