import { CourseModel } from '@/infrastructure/database/models/course-model'
import { InstitutionModel } from '@/infrastructure/database/models/institution-model'
import { MatriculeModel } from '@/infrastructure/database/models/matricule-model'
import { TeacherModel } from '@/infrastructure/database/models/teacher-model'
import { CreateCourseDto } from '@/infrastructure/database/schemas/course-schema'
import { ICourseRepository } from '@/core/interfaces/repositories/course-repository'
import { Service } from 'typedi'

@Service()
export class CourseService implements ICourseRepository {
  async createCourse(course: CreateCourseDto, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

    const teacherLead = await TeacherModel.findById(course.teacherLeadId)
    if (!teacherLead) throw 'Profesor titular no encontrado'

    const newCourse = await CourseModel.create({ ...course, institution, teacherLead })
    return newCourse
  }

  async updateCourse(course: CreateCourseDto, _id: string) {
    const teacherLead = await TeacherModel.findById(course.teacherLeadId)
    if (!teacherLead) throw 'Profesor titular no encontrado'

    const updatedCourse = await CourseModel.updateOne({ _id }, { ...course, teacherLead })

    return updatedCourse
  }

  async deleteCourse(courseId: string) {
    const deletedCourse = await CourseModel.findByIdAndDelete(courseId)
    return deletedCourse
  }

  async getAllCourses(institutionId: string) {
    const courses = await CourseModel
      .find({ institution: { _id: institutionId } })
      .select('-schedules -institution')
      .populate({
        path: 'teacherLead',
        select: 'name'
      })

    const response = []

    for (const course of courses) {
      const matricules = await MatriculeModel.find({ course: { _id: course._id } })

      response.push({ ...course.toObject(), studentCount: matricules.length })
    }

    return response
  }

  async getCourseById(courseId: string) {
    const course = await CourseModel.findById(courseId)
    return course
  }
}
