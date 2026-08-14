import { ORM } from '..';
import { IStudentAssistenceRepository } from '@/core/interfaces/repositories/student-assistence-repository';
import { StudentAssistence } from '@/core/interfaces/dtos/student-assistence';
import { Inject, Service } from 'typedi';
import { StudentAssistenceSchema } from '../schemas/student-assistence-schema';
import { StudentRepository } from './student-repository';
import { MatriculeRepository } from './matrciule-repository';
import { DateFormatterAdapter } from '@/infrastructure/adapters/date-formats';
import { Student } from '@/core/interfaces/dtos';

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

  private readonly verifyExistingAssistence = async (student: Student, date: string | Date): Promise<void> => {
    const assistence = await this.orm.models.StudentAssistenceModel.find({
      student,
      date: {
        $gte: this.dateFormatterAdapter.toGteAndLteDate(date).gte,
        $lte: this.dateFormatterAdapter.toGteAndLteDate(date).lte
      }
    })

    console.log(assistence)

    if (assistence.length > 0) throw new Error('Assistence already exists')
  }

  async createAssitence(assistence: StudentAssistenceSchema, institutionId: string): Promise<StudentAssistence> {
    const { studentId, ...assistenceData } = assistence
    const date = this.dateFormatterAdapter.getCurrentDateUTC()
    const student = await this.studentRepository.getActiveStudent(studentId, institutionId)
    const matricule = await this.matriculeRepository.getActiveMatricule(student._id)

    await this.verifyExistingAssistence(student, date)

    return await this.orm.models.StudentAssistenceModel.create({
      ...assistenceData,
      student,
      matricule,
      date
    })
  }

  async getAllAssitencesByStudent(studentId: string, institutionId: string): Promise<StudentAssistence[]> {
    const student = await this.studentRepository.getActiveStudent(studentId, institutionId)
    return await this.orm.models.StudentAssistenceModel.find({ student })
  }
}