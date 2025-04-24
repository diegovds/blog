import { Router } from 'express'

export const mainRoutes = Router()

mainRoutes.get('/ping', (req, res) => {
  res.json({ pong: true })
})
