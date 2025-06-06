import bcrypt from 'bcryptjs'
import { prisma } from '../libs/prisma'

type CreateUserProps = {
  name: string
  email: string
  password: string
}

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserProps) => {
  email = email.toLocaleLowerCase()

  const user = await prisma.user.findFirst({
    where: { email },
  })

  if (user) return false

  const newPassword = bcrypt.hashSync(password, 10)

  return await prisma.user.create({
    data: { name, email, password: newPassword },
  })
}

type VerifyUserTypes = {
  email: string
  password: string
}

export const verifyUser = async ({ email, password }: VerifyUserTypes) => {
  const user = await prisma.user.findFirst({
    where: { email },
  })

  if (!user) return false

  if (!bcrypt.compareSync(password, user.password)) return false

  return user
}

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
    },
  })
}
