
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
  institution: Institution
  status: 'active' | 'inactive'
}

export type Observations = {
  student: Student
  teacher: Teacher
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
}

export type UserInstitution = {
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
  institution: Institution
  lastLogin: Date
}

export type Schedule = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
  time: string
  teacher?: Teacher
  asignature?: Asignature
  course: Course
}

export type Asignature = {
  name: string
  institution: Institution
}

export type Teacher = {
  name: string
  birthday: string
  phoneNumber: string
  email: string
  status: 'active' | 'inactive'
  institution: Institution
  photo?: string
}

export type TeacherAuth = {
  teacher: Teacher
  lastLogin: Date
  password: string
}

export type Course = {
  name: string
  schedules: Schedule[]
  groupName: string
  teacherLead: Teacher
  institution: Institution
  order: number
  breakTime: string
}

export type Matricule = {
  student: Student
  course: Course
  status: 'active' | 'inactive'
  institution: Institution
  year: number
}

export type RootUser = {
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
  lastLogin: Date
}

export type Assistance = {
  course: Course
  teacher: Teacher
  date: Date
  observation: string
  studentsPresents: Student[]
  studentsAbsent: Student[]
}

export type Notifications = {
  title: string
  body: string
  responsablePerson: ResponsablePerson
  readed: boolean
  deleted: boolean
  institution: Institution
}

export type Token = {
  token: string
  role: 'responsable' | 'student'
  student?: Student
  responsable?: ResponsablePerson
  institution: Institution
}

export type Period = {
  name: string
  startDate: Date
  endDate: Date
  institution: Institution
}

export type Task = {
  institution: Institution
  period: Period
  teacher: Teacher
  course: Course
  asignature: Asignature
  name: string
  description: string
  status: 'pending' | 'completed' | 'unfulfilled' | 'incomplete'
  highestScore: number
  score: number | null
  dueDate: Date
}