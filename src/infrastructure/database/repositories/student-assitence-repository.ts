import { ORM } from '..';
import { IStudentAssistenceRepository } from '@/core/interfaces/repositories/student-assistence-repository';
import { StudentAssistence } from '@/core/interfaces/dtos/student-assistence';
import { Inject, Service } from 'typedi';
import { StudentAssistenceSchema } from '../schemas/student-assistence-schema';
import { StudentRepository } from './student-repository';
import { MatriculeRepository } from './matrciule-repository';
import { DateFormatterAdapter } from '@/infrastructure/adapters/date-formats';

@Service()
export class StudentAssistenceRepository implements IStudentAssistenceRepository {
  @Inject(() => ORM)
  private readonly orm!: ORM;

  @Inject(() => StudentRepository)
  private studentRepository!: StudentRepository

  @Inject(() => MatriculeRepository)
  private matriculeRepository!: MatriculeRepository

  @Inject(() => DateFormatterAdapter)
  private readonly dateFormatterAdapter!: DateFormatterAdapter

  private readonly verifyExistingAssistence = async (studentId: string, date: Date) => {
    return await this.orm.models.StudentAssistenceModel.findOne({
      student: {
        _id: studentId
      },
      date: {
        $gte: this.dateFormatterAdapter.toGteAndLteDate(date).gte,
        $lt: this.dateFormatterAdapter.toGteAndLteDate(date).lte
      }
    })
  }

  async createAssitence(assistence: StudentAssistenceSchema, institutionId: string): Promise<StudentAssistence> {
    const { studentId, ...assistenceData } = assistence
    const student = await this.studentRepository.getActiveStudent(studentId, institutionId)
    const matricule = await this.matriculeRepository.getActiveMatricule(student._id)

    const assistenceVerify = await this.verifyExistingAssistence(student._id, assistenceData.date)
    if (assistenceVerify) {
      throw new Error('Assistence already exists')
    }

    return await this.orm.models.StudentAssistenceModel.create({
      ...assistenceData,
      student,
      matricule,
    })
  }

  async getAllAssitencesByStudent(studentId: string, institutionId: string): Promise<StudentAssistence[]> {
    const student = await this.studentRepository.getActiveStudent(studentId, institutionId)
    return await this.orm.models.StudentAssistenceModel.find({ student })
  }
}