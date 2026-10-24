import { ResponsablePersonSchema, ResponsablePersonUpdate } from '@/infrastructure/schemas/responsable-schema'
import { IResponsableRepository } from '@/core/interfaces/service/responsable-service'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { ResponsablePerson } from '@/core/interfaces/dtos'

@Service()
export class ResponsableRepository implements IResponsableRepository {
  @Inject(() => ORM)
  private ORM!: ORM

  async createResponsable(responsable: ResponsablePersonSchema): Promise<ResponsablePerson> {
    return await this.ORM.models.ResponsableModel.create(responsable)
  }

  async updateResponsable(responsable: ResponsablePersonUpdate) {
    const { _id, ...rest } = responsable
    await this.ORM.models.ResponsableModel.updateOne({ _id }, rest)
  }

  async deleteResponsable(id: string) {
    const deleted = await this.ORM.models.ResponsableModel.findByIdAndDelete(id)
    if (!deleted) throw new Error('Responsable no encontrado')
  }

  async getAllResponsables() {
    return await this.ORM.models.ResponsableModel.find()
  }

  async getResponsableById(_id: string) {
    return await this.ORM.models.ResponsableModel.findById(_id)
  }

  async getActiveResponsable(responsableId: string): Promise<ResponsablePerson> {
    const responsable = await this.ORM.models.ResponsableModel.findById(responsableId)
    if (!responsable) throw 'Responsable no encontrado'
    return responsable
  }

  async searchResponsable(search: string): Promise<ResponsablePerson[]> {
    return await this.ORM.models.ResponsableModel.find({
      $or: [
        { fullName: { $regex: search, $options: 'i' } },
        { identification: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ]
    })
  }

  async getResponsablesByCourse(courseId: string): Promise<ResponsablePerson[]> {
    const matricule = await this.ORM.models.MatriculeModel.find({
      course: {
        _id: courseId
      },
      year: new Date().getFullYear()
    })

    const students = await this.ORM.models.StudentModel
      .find({ _id: { $in: matricule.map(m => m.student._id) } })
      .populate('responsable')

    return await this.ORM.models.ResponsableModel.find({
      _id: { $in: students.map(s => s.responsable?._id!) }
    })
  }
}
