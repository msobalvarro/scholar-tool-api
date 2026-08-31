import { CreateCourseDto } from '@/infrastructure/schemas/course-schema'
import { ICourseRepository } from '@/core/interfaces/service/course-service'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { Course } from '@/core/interfaces/dtos'
import { InstitutionService } from './institution-service'

@Service()
export class CourseService implements ICourseRepository {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  async createCourse(course: CreateCourseDto, institutionId: string) {
    const institution = await this.institutionService.getActiveInstitution(institutionId)

    const teacherLead = await this.ORM.models.TeacherModel.findById(course.teacherLeadId)
    if (!teacherLead) throw 'Profesor titular no encontrado'

    const newCourse = await this.ORM.models.CourseModel.create({ ...course, institution, teacherLead })
    return newCourse
  }

  async updateCourse(course: CreateCourseDto, _id: string) {
    const teacherLead = await this.ORM.models.TeacherModel.findById(course.teacherLeadId)
    if (!teacherLead) throw 'Profesor titular no encontrado'

    await this.ORM.models.CourseModel.updateOne({ _id }, { ...course, teacherLead })
  }

  async deleteCourse(courseId: string) {
    const enrollmentsByCourse = await this.ORM.models.EnrollmentModel.find({
      courses: { _id: courseId }
    })
    if (enrollmentsByCourse.length > 0) throw 'El curso está asignado a una matrícula'

    await this.ORM.models.CourseModel.findByIdAndDelete(courseId)
  }

  async getAllCourses(institutionId: string) {
    const courses = await this.ORM.models.CourseModel
      .find({ institution: { _id: institutionId } })
      .select('-schedules -institution')
      .populate({
        path: 'teacherLead',
        select: 'name'
      })

    const response = []

    for (const course of courses) {
      const matricules = await this.ORM.models.MatriculeModel.find({ course: { _id: course._id } })

      response.push({ ...course.toObject(), studentCount: matricules.length })
    }

    return response
  }

  async getCourseById(courseId: string) {
    return await this.ORM.models.CourseModel.findById(courseId)
  }

  async getActiveCourse(courseId: string) {
    const course = await this.ORM.models.CourseModel.findById(courseId)
    if (!course) throw 'Curso no encontrado'

    return course
  }

  async getAllCoursesNotInEnrollment(institutionId: string) {
    const enrollments = await this.ORM.models.EnrollmentModel
      .find({
        institution: { _id: institutionId },
        year: new Date().getFullYear()
      })
      .populate({ path: 'courses', select: '_id name' })

    const allCoursesIdWithEnrollemts = enrollments.reduce((acc: string[] = [], enrollment) => {
      enrollment.courses?.forEach((course: Course) => {
        if (!acc.includes(course._id)) {
          acc.push(course._id)
        }
      })

      return acc
    }, [])

    return await this.ORM.models.CourseModel.find({
      _id: {
        $nin: allCoursesIdWithEnrollemts
      }
    })
  }

  async getAllStudentsByCourse(courseId: string) {
    const matricules = await this.ORM.models.MatriculeModel
      .find({ courses: { _id: courseId } })
      .populate({
        path: 'student',
        select: '_id name lastName parentName email'
      })
      .select('student')

    return matricules.map((matricule) => matricule.student)
  }
}
