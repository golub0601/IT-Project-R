import express from 'express'
import { allUsers, updateUserRole } from '../controllers/user_controller.js'

const router = express.Router()

router.get('/', allUsers);
router.put('/:id/role', updateUserRole);
export default router