import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { createCalendar, getMonths, getWeeksOfMonth, updateWeeks } from '../controllers/calendarController.js';

const router = express.Router()

router.route('/')
	.post(authMiddleware, createCalendar)

router.route('/months/:property/:user/:year').get(authMiddleware, getMonths)
router.route('/month/weeks/:property/:user/:year/:month').get(authMiddleware, getWeeksOfMonth)
router.route('/months/update').put(authMiddleware, updateWeeks)

export default router