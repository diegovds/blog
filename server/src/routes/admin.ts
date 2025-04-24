import { Router } from 'express'
import * as adminController from '../controllers/admin'

export const adminRoutes = Router()

adminRoutes.post('/posts', adminController.addAPost)
adminRoutes.get('/posts', adminController.getAllPosts)
adminRoutes.get('/posts/:slug', adminController.getAPost)
adminRoutes.put('/posts/:slug', adminController.updateAPost)
adminRoutes.delete('/posts/:slug', adminController.deleteAPost)
