import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { env } from './env'

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static('public'))

server.get('/apicls/ping', (req, res) => {
  res.json({ pong: true })
})

server.listen({ port: env.PORT }, () => {
  console.log(`🚀 HTTP Server Running! http://localhost:${env.PORT}`)
})
