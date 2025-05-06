import { RequestHandler } from 'express'
import { coverToUrl } from '../utils/cover-to-url'
import { getPublishedPosts } from '../services/post'

export const getAllPosts: RequestHandler = async (req, res) => {
  let page = 1

  if (req.query.page) {
    page = parseInt(req.query.page as string)

    if (page <= 0) {
      res.json({ error: 'Página inexistente' })
      return
    }
  }

  const posts = await getPublishedPosts(page)

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

export const getAPost: RequestHandler = async (req, res) => {}

export const getRelatedPosts: RequestHandler = async (req, res) => {}
