import 'reflect-metadata'
import mongoose from 'mongoose'
import { UserRootModel } from '../models/root-user-model'
import { InstitutionModel } from '../models/institution-model'
import { UserInstitutionModel } from '../models/user-institution-model'
import { createHash } from '@/utils/encrypt'
import { environments } from '@/utils/constanst'

async function seedAuth() {
  if (
    !process.env.SEED_ROOT_EMAIL ||
    !process.env.SEED_ROOT_PASSWORD ||
    !process.env.SEED_INSTITUTION_NAME ||
    !process.env.SEED_INSTITUTION_EMAIL ||
    !process.env.SEED_INSTITUTION_PASSWORD
  ) {
    throw new Error('No se han configurado todas las variables de entorno necesarias para el seeding.')
  }

  console.log('Iniciando seeder de autenticación...')

  try {
    if (!environments.DB) {
      throw new Error('La variable de entorno DB no está configurada.')
    }

    await mongoose.connect(environments.DB)
    console.log('Conexión exitosa a la base de datos para seeding')

    // 1. Seed User Root (Admin General)
    const rootEmail = process.env.SEED_ROOT_EMAIL
    const rootPassword = process.env.SEED_ROOT_PASSWORD

    const existingRoot = await UserRootModel.findOne({ email: rootEmail })
    if (existingRoot) {
      console.log(`El usuario Root (${rootEmail}) ya existe en la base de datos.`)
    } else {
      await UserRootModel.create({
        name: 'Administrador Root',
        email: rootEmail,
        password: createHash(rootPassword),
        status: 'active',
      })
      console.log(`Usuario Root creado exitosamente: ${rootEmail}`)
    }

    // 2. Seed Institution & User Institution (Admin Institución)
    const instName = process.env.SEED_INSTITUTION_NAME
    let institution = await InstitutionModel.findOne({ name: instName })

    if (!institution) {
      institution = await InstitutionModel.create({
        name: instName,
        status: 'active',
      })
      console.log(`Institución demo creada exitosamente: "${instName}"`)
    } else {
      console.log(`La institución "${instName}" ya existe en la base de datos.`)
    }

    const instEmail = process.env.SEED_INSTITUTION_EMAIL
    const instPassword = process.env.SEED_INSTITUTION_PASSWORD

    const existingUserInst = await UserInstitutionModel.findOne({ email: instEmail })
    if (existingUserInst) {
      console.log(`El usuario de Institución (${instEmail}) ya existe en la base de datos.`)
    } else {
      await UserInstitutionModel.create({
        name: 'Administrador Institucional',
        email: instEmail,
        password: createHash(instPassword),
        institution: institution,
        status: 'active',
      })
      console.log(`Usuario de Institución creado exitosamente: ${instEmail}`)
    }

    console.log('Seeding de autenticación completado con éxito.')
  } catch (error) {
    console.error('Error ejecutando el seeder de autenticación:', error)
    process.exitCode = 1
  } finally {
    await mongoose.connection.close()
    console.log('Conexión a la base de datos cerrada.')
  }
}

seedAuth()
