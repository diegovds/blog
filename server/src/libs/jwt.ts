import jwt from 'jsonwebtoken'
import { env } from '../env'

type CreateJWTProps = {
  id: string
}

export const createJWT = (payload: CreateJWTProps) => {
  return jwt.sign(payload, env.JWT_KEY)
}
