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

    const createdStudent = new StudentModel({
      ...rest,
      institution
    })

    const responsable = await ResponsableModel.findById(responsableId)
    if (!responsable) throw 'Responsable not found'

    await responsable.updateOne({ $push: { students: createdStudent._id } })

    await createdStudent.save()

    return createdStudent
  }

  async updateStudent(student: StudentUpdate) {
    const { _id, ...rest } = student
    const updatedStudent = await StudentModel.updateOne({ _id }, rest)
    return updatedStudent
  }

  async deleteStudent(_id: string) {
    const deletedStudent = await StudentModel.deleteOne({ _id })
    return deletedStudent
  }

  async getAllStudents(institutionId: string) {
    const students = await StudentModel.find({ institution: { _id: institutionId } })
    return students
  }

  async getStudentById(_id: string) {
    const student = await StudentModel.findById(_id)
    return student
  }
}

export const studentService = new StudentService()