const { DB, JWT_SECRET, JWT_SECRET_ADMIN, JWT_SECRET_USER_INSTITUTION } = process.env

export const environments = {
  DB: DB || 'mongodb://localhost:27017/f8-erp',
  JWT_SECRET: JWT_SECRET || 'secret',
  JWT_SECRET_ADMIN: JWT_SECRET_ADMIN || 'secret',
  JWT_SECRET_USER_INSTITUTION: JWT_SECRET_USER_INSTITUTION || 'secret',
} 