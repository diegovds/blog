import { RequestHandler, Response } from 'express'
import z from 'zod'
import { createPost, createPostSlug, handleCover } from '../services/post'
import { getUserById } from '../services/user'
import { ExtendedRequest } from '../types/extended-request'
import { coverToUrl } from '../utils/cover-to-url'

export const addAPost = async (req: ExtendedRequest, res: Response) => {
  if (!req.user) return

  const bodySchema = z.object({
    title: z.string(),
    tags: z.string(),
    body: z.string(),
  })

  const data = bodySchema.safeParse(req.body)

  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors })
  } else {
    if (!req.file) {
      res.json({ error: 'Sem arquivo' })
      return
    }

    const coverName = await handleCover(req.file)

    if (!coverName) {
      res.json({ error: 'Imagem não permitida/enviada' })
      return
    }

    const { body, tags, title } = data.data

    const slug = await createPostSlug(title)

    const newPost = await createPost({
      authorId: req.user?.id,
      slug,
      title,
      tags,
      body,
      cover: coverName,
    })

    const author = await getUserById(newPost.authorId)

    res.status(201).json({
      post: {
        id: newPost.id,
        slug: newPost.slug,
        title: newPost.title,
        createdAt: newPost.createdAt,
        cover: coverToUrl(newPost.cover),
        tags: newPost.tags,
        authorName: author?.name,
      },
    })
  }
}

export const getAllPosts: RequestHandler = async (req, res) => {}

export const getAPost: RequestHandler = async (req, res) => {}

export const updateAPost: RequestHandler = async (req, res) => {}

export const deleteAPost: RequestHandler = async (req, res) => {}
