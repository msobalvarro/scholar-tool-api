export type RootUser = {
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
  lastLogin: Date
}
