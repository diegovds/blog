import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { env } from './env'
import { mainRoutes } from './routes/main'
import { authRoutes } from './routes/auth'
import { adminRoutes } from './routes/admin'

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static('public'))

server.use('/api/auth', authRoutes)
server.use('/api/admin', adminRoutes)
server.use('/api', mainRoutes)

server.listen({ port: env.PORT }, () => {
  console.log(`🚀 HTTP Server Running! http://localhost:${env.PORT}`)
})
