import { ORM } from '..';
import { IStudentAssistenceRepository } from '../../../core/interfaces/repositories/student-assistence-repository';
import { StudentAssistence } from '../../../core/interfaces/dtos/student-assistence';
import { Inject, Service } from 'typedi';
import { StudentAssistenceSchema } from '../schemas/student-assistence-schema';
import { StudentRepository } from './student-repository';
import { MatriculeRepository } from './matrciule-repository';

@Service()
export class StudentAssistenceRepository implements IStudentAssistenceRepository {
  @Inject(() => ORM)
  private readonly orm!: ORM;

  @Inject(() => StudentRepository)
  private studentRepository!: StudentRepository

  @Inject(() => MatriculeRepository)
  private matriculeService!: MatriculeRepository

  async createAssitence(assistence: StudentAssistenceSchema, institutionId: string): Promise<StudentAssistence> {
    const { studentId, ...assistenceData } = assistence
    const student = await this.studentRepository.getActiveStudent(studentId, institutionId)
    const matricule = await this.matriculeService.getActiveMatricule(student._id)

    return await this.orm.models.StudentAssistenceModel.create({
      ...assistenceData,
      student,
      matricule,
    })
  }

  async getAllAssitences(insutionId: string): Promise<StudentAssistence[]> {
    return await this.orm.models.StudentAssistenceModel
      .find({
        matricule: {
          institution: {
            _id: insutionId
          }
        }
      })
      .populate('student', 'matricule')
  }
}