import express from 'express'
import { addPost, getAllPosts, getPost, deletePost, updatePost } from '../controllers/post_controller.js'

const router = express.Router()

router.get('/', getAllPosts)
router.get('/:id/with-recommendations', getPost)
router.post('/', addPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)


export default router