import { MatriculeModel } from '@/models/matricule-model'
import { Matricule, MatriculeUpdate } from '@/schemas/matricule-schema'
import { InstitutionModel } from '@/models/institution-model'

class MatriculeService {
  async createMatricule(matricule: Matricule, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'
    if (institution.status !== 'active') throw 'Institution is not active'

    const createdMatricule = await MatriculeModel.create({
      ...matricule,
      institution
    })
    return createdMatricule
  }

  async updateMatricule(matricule: MatriculeUpdate) {
    const { _id, ...rest } = matricule

    const updatedMatricule = await MatriculeModel.updateOne({ _id }, rest)
    return updatedMatricule
  }

  async deleteMatricule(_id: string) {
    const deletedMatricule = await MatriculeModel.deleteOne({ _id })
    return deletedMatricule
  }

  async getAllMatricules() {
    const matricules = await MatriculeModel.find()
    return matricules
  }

  async getMatriculeById(_id: string) {
    const matricule = await MatriculeModel.findById(_id)
    return matricule
  }
}

export const matriculeService = new MatriculeService()