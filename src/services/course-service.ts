import { CourseModel } from '@/models/course-model'
import { InstitutionModel } from '@/models/institution-model'
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

    const updatedCourse = await CourseModel.findByIdAndUpdate(_id, rest, { new: true })
    return updatedCourse
  }

  async deleteCourse(courseId: string) {
    const deletedCourse = await CourseModel.findByIdAndDelete(courseId)
    return deletedCourse
  }

  async getAllCourses(institutionId: string) {
    const courses = await CourseModel.find({ institution: { _id: institutionId } })
    return courses
  }

  async getCourseById(courseId: string) {
    const course = await CourseModel.findById(courseId)
    return course
  }
}

export const courseService = new CourseService()
