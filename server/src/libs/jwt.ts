import jwt from 'jsonwebtoken'
import { env } from '../env'

type CreateJWTProps = {
  id: string
}

export const createJWT = (payload: CreateJWTProps) => {
  return jwt.sign(payload, env.JWT_KEY)
}

export const readJWT = (hash: string) => {
  try {
    return jwt.verify(hash, env.JWT_KEY)
  } catch (err) {
    return false
  }
}
