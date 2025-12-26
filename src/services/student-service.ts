import { InstitutionModel } from '@/models/institution-model'
import { ResponsableModel } from '@/models/responsable-model'
import { StudentModel } from '@/models/student-model'
import { Student, StudentUpdate } from '@/schemas/student-schema'

class StudentService {
  async createStudent(student: Student, institutionId: string) {

    const { responsableId, ...rest } = student

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'
    if (institution.status !== 'active') throw 'Institution is not active'

    const responsable = await ResponsableModel.findById(responsableId)
    if (!responsable) throw 'Responsable not found'

    return await StudentModel.create({
      ...rest,
      responsable,
      institution
    })
  }

  async updateStudent(student: StudentUpdate, institutionId: string, studentId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'
    if (institution.status !== 'active') throw 'Institution is not active'

    return await StudentModel.updateOne({ _id: studentId, institution: { _id: institutionId } }, student)
  }

  async deleteStudent(_id: string, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'
    if (institution.status !== 'active') throw 'Institution is not active'

    return await StudentModel.deleteOne({ _id, institution: { _id: institutionId } })
  }

  async getAllStudents(institutionId: string) {
    return await StudentModel
      .find({ institution: { _id: institutionId } })
      .populate('responsable')
  }

  async getStudentById(_id: string, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'
    if (institution.status !== 'active') throw 'Institution is not active'

    return await StudentModel
      .findOne({ _id })
      .populate('responsable')
  }
}

export const studentService = new StudentService()