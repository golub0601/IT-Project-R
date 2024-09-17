import express from 'express';
import { getRoles } from '../controllers/roles_controller.js';

const router = express.Router();

router.get('/', getRoles); // API endpoint to fetch roles

export default router;