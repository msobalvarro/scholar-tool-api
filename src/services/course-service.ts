import { CourseModel } from '@/models/course-model'
import { InstitutionModel } from '@/models/institution-model'
import { MatriculeModel } from '@/models/matricule-model'
import { TeacherModel } from '@/models/teacher-model'
import { Course, CourseUpdate } from '@/schemas/course-schema'

class CourseService {
  async createCourse(course: Course, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'

    const teacherLead = await TeacherModel.findById(course.teacherLeadId)
    if (!teacherLead) throw 'Teacher lead not found'

    const newCourse = await CourseModel.create({ ...course, institution, teacherLead })
    return newCourse
  }

  async updateCourse(course: CourseUpdate) {
    const { _id, ...rest } = course

    const teacherLead = await TeacherModel.findById(course.teacherLeadId)
    if (!teacherLead) throw 'Teacher lead not found'

    const updatedCourse = await CourseModel.updateOne({ _id }, { ...rest, teacherLead })

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

export const courseService = new CourseService()
