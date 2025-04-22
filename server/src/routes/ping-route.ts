import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const pingRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/ping',
    {
      schema: {
        summary: 'Route for server testing',
        tags: ['ping'],
        response: {
          200: z.object({
            pong: z.boolean(),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send({ pong: true })
    },
  )
}
