import { Institution } from './institution';
import { Matricule } from './matricule';
import { Student } from './student';

export interface StudentAssistence {
  student: Student
  date: Date
  assistence: boolean
  matricule: Matricule
  institution: Institution
  justification?: string
}