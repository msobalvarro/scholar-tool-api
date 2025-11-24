
export type ResponsablePerson = {
  fullName: string
  identification: string
  email: string | null
  phoneNumber: string
  students: Student[]
}

export type Student = {
  birthday: Date
  startDate: Date
  firstName: string
  lastName: string
  intitution: Institution
  course: Course
  status: 'active' | 'inactive'
}

export type Observations = {
  student: Student
  techer: Teacher
  type: 'negative' | 'positive'
  observation: string
  photo?: string
}

export type Devices = {
  token: string
  role: 'responsable' | 'student'
  student?: Student
  responsable?: ResponsablePerson
}

export type Institution = {
  name: string
  logo?: string
  status: 'active' | 'inactive' | 'pending'
  users: UserInstitution[]
  teachers: Teacher[]
}

export type UserInstitution = {
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
}

export type Schedule = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
  startTime: string
  endTime: string
  teacher?: Teacher
  asignature?: Asignature
  course: Course
  isFree: boolean
}

export type Asignature = {
  name: string
}

export type Teacher = {
  name: string
  birthday: Date
  phoneNumber: string
  status: 'active' | 'inactive'
}

export type Course = {
  name: string
  groupName: string
}

export type Matricule = {
  student: Student
  course: Course
  status: 'active' | 'inactive'
  year: number
}

export type RootUser = {
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
}
