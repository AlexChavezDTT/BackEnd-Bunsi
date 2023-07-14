import Calendar from '../models/Calendar.js'
import { validateObjectId, handleConsoleColorInitFunction, handleConsoleColorError, handleNotFoundError } from '../utils/index.js';

const createCalendar = async (req, res) => {
	try {
		const calendar = new Calendar(req.body)
		const user = req.user

		calendar.save().then(doc => {
			console.log("Save ✅:", doc);
			res.status(200);
			res.json({
				msg: `El calendario para el usuario ${user.name} se creo correctamente`,
				user: user,
				property: doc
			})
		})
	} catch (error) {
		handleConsoleColorError(error.message)
	}
}

export {
	createCalendar
}