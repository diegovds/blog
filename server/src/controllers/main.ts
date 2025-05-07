import { RequestHandler } from 'express'
import z from 'zod'
import * as postServices from '../services/post'
import { coverToUrl } from '../utils/cover-to-url'

export const getAllPosts: RequestHandler = async (req, res) => {
  let page = 1

  if (req.query.page) {
    page = parseInt(req.query.page as string)

    if (page <= 0) {
      res.json({ error: 'Página inexistente' })
      return
    }
  }

  const posts = await postServices.getPublishedPosts(page)

  const postsToReturn = posts.map((post) => ({
    id: post.id,
    status: post.status,
    title: post.title,
    created: post.createdAt,
    cover: coverToUrl(post.cover),
    authorName: post.author.name,
    tags: post.tags,
    slug: post.slug,
  }))

  res.json({ posts: postsToReturn, page })
}

export const getPost: RequestHandler = async (req, res) => {
  const paramsSchema = z.object({
    slug: z.string(),
  })

  const params = paramsSchema.safeParse(req.params)

  if (!params.success) {
    res.json({ error: params.error.flatten().fieldErrors })
    return
  }

  const { slug } = params.data

  const post = await postServices.getPostBySlug(slug)

  if (!post || (post && post.status === 'DRAFT')) {
    res.json({ error: 'Post inexistente' })
    return
  }

  res.json({
    post: {
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      cover: coverToUrl(post.cover),
      authorName: post.author.name,
      tags: post.tags,
      body: post.body,
      slug: post.slug,
    },
  })
}

export const getRelatedPosts: RequestHandler = async (req, res) => {
  const paramsSchema = z.object({
    slug: z.string(),
  })

  const params = paramsSchema.safeParse(req.params)

  if (!params.success) {
    res.json({ error: params.error.flatten().fieldErrors })
    return
  }

  const { slug } = params.data

  const posts = await postServices.getPostsWithSameTags(slug)

  const postsToReturn = posts.map((post) => ({
    id: post.id,
    title: post.title,
    created: post.createdAt,
    cover: coverToUrl(post.cover),
    authorName: post.author.name,
    tags: post.tags,
    slug: post.slug,
  }))

  res.json({ posts: postsToReturn })
}
