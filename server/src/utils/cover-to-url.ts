import { env } from '../env'

export const coverToUrl = (coverName: string) => {
  return coverName ? `${env.BASE_URL}/images/covers/${coverName}` : ''
}
