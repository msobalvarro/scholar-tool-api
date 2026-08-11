import { Matricule } from './matricule';
import { Student } from './student';

export interface StudentAssistence {
  student: Student
  date: Date
  assistence: boolean
  matricule: Matricule
  justification?: string
}