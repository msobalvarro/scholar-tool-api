const { DB, JWT_SECRET } = process.env

export const environments = {
  DB: DB || 'mongodb://localhost:27017/f8-erp',
  JWT_SECRET: JWT_SECRET || 'secret'
} 