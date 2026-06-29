export type Institution = {
  _id?: string
  name: string
  logo?: string
  status: 'active' | 'inactive' | 'pending'
}
