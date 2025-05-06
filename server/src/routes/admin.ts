import { Router } from 'express'
import * as adminController from '../controllers/admin'
import { upload } from '../libs/multer'
import { privateRoute } from '../middlewares/private-route'

export const adminRoutes = Router()

adminRoutes.post(
  '/posts',
  privateRoute,
  upload.single('cover'),
  adminController.addAPost,
)
adminRoutes.get('/posts', adminController.getAllPosts)
adminRoutes.get('/posts/:slug', adminController.getAPost)
adminRoutes.put(
  '/posts/:slug',
  privateRoute,
  upload.single('cover'),
  adminController.editAPost,
)
adminRoutes.delete('/posts/:slug', privateRoute, adminController.deleteAPost)
