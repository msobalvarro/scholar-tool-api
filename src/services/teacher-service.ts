import { InstitutionModel } from '@/models/institution-model'
import { TeacherModel } from '@/models/teacher-model'
import { DeleteTeacherSchema, TeacherSchema, UpdateTeacherSchema } from '@/schemas/teacher-schema'

class TeacherService {
  async createTeacher(institutionId: string, payload: TeacherSchema) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institucion no encontrada'

    const teacher = await TeacherModel.create(payload)
    await InstitutionModel.updateOne({ _id: institutionId }, { $push: { teachers: teacher } })
    return teacher
  }

  async getTeachers(institutionId: string) {
    const insitution = await InstitutionModel.findById(institutionId)
    return insitution?.teachers
  }

  async getAllTeachers() {
    const teachers = await TeacherModel.find()
    return teachers
  }

  async getTeacherById(id: string) {
    const teacher = await TeacherModel.findById(id)
    return teacher
  }

  async updateTeacher(payload: UpdateTeacherSchema) {
    const { _id, ...rest } = payload
    const teacher = await TeacherModel.findByIdAndUpdate(_id, rest, { new: true })
    return teacher
  }

  async deleteTeacher(_id: string) {
    const teacher = await TeacherModel.findByIdAndDelete(_id)
    return teacher
  }
}

export const teacherService = new TeacherService()