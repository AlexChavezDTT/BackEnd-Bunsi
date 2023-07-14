import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { createCalendar } from '../controllers/calendarController.js';

const router = express.Router()

router.route('/')
	.post(authMiddleware, createCalendar)

export default router