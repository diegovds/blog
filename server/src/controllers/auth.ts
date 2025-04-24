import { RequestHandler } from 'express'
import z from 'zod'
import { createToken } from '../services/auth'
import { createUser } from '../services/user'

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

export const signin: RequestHandler = async (req, res) => {}

export const validate: RequestHandler = async (req, res) => {}
