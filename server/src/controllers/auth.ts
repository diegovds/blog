import { RequestHandler, Response } from 'express'
import z from 'zod'
import { createToken } from '../services/auth'
import { createUser, verifyUser } from '../services/user'
import { ExtendedRequest } from '../types/extended-request'

export const signup: RequestHandler = async (req, res) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const data = bodySchema.safeParse(req.body)

  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors })
  } else {
    const { name, email, password } = data.data
    const newUser = await createUser({ name, email, password })

    if (!newUser) {
      res.json({ error: 'Erro ao criar usuário' })
    } else {
      const token = createToken(newUser)

      res.status(201).json({
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
      })
    }
  }
}

export const signin: RequestHandler = async (req, res) => {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const data = bodySchema.safeParse(req.body)

  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors })
  } else {
    const { email, password } = data.data

    const user = await verifyUser({ email, password })

    if (!user) {
      res.json({ error: 'Acesso negado' })
    } else {
      const token = createToken(user)

      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      })
    }
  }
}

export const validate = async (req: ExtendedRequest, res: Response) => {
  res.json({ user: req.user })
}
