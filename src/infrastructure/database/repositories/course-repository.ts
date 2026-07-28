import { CreateCourseDto } from '@/infrastructure/database/schemas/course-schema'
import { ICourseRepository } from '@/core/interfaces/repositories/course-repository'
import { Inject, Service } from 'typedi'
import { ORM } from '..'

@Service()
export class CourseService implements ICourseRepository {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  async createCourse(course: CreateCourseDto, institutionId: string) {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

    const teacherLead = await this.ORM.models.TeacherModel.findById(course.teacherLeadId)
    if (!teacherLead) throw 'Profesor titular no encontrado'

    const newCourse = await this.ORM.models.CourseModel.create({ ...course, institution, teacherLead })
    return newCourse
  }

  async updateCourse(course: CreateCourseDto, _id: string) {
    const teacherLead = await this.ORM.models.TeacherModel.findById(course.teacherLeadId)
    if (!teacherLead) throw 'Profesor titular no encontrado'

    const updatedCourse = await this.ORM.models.CourseModel.updateOne({ _id }, { ...course, teacherLead })

    return updatedCourse
  }

  async deleteCourse(courseId: string) {
    const enrollmentsByCourse = await this.ORM.models.EnrollmentModel.find({
      courses: { _id: courseId }
    })
    if (enrollmentsByCourse.length > 0) throw 'El curso está asignado a una matrícula'

    return await this.ORM.models.CourseModel.findByIdAndDelete(courseId)
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

  async getAllCoursesNotInEnrollment(institutionId: string, enrollmentId: string) {
    const enrollment = await this.ORM.models.EnrollmentModel.findById(enrollmentId)
    if (!enrollment) throw 'Matrícula no encontrada'

    const courses = await this.ORM.models.EnrollmentModel.distinct('courses', {
      _id: { $ne: enrollmentId },
      institution: { _id: institutionId },
      year: enrollment.year
    })

    return courses
  }
}
