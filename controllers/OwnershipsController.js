import Ownerships from '../models/Ownerships.js'
import { validateObjectId, handleConsoleColorInitFunction, handleConsoleColorError, handleNotFoundError } from '../utils/index.js';

const creatOwnerships = async (req, res) => {
	try {
		const ownerships = new Ownerships(req.body)
		const user = req.user
		const admin = user.admin

		if (admin) {
			ownerships.save().then(doc => {
				console.log("Save ✅:", doc);
				res.status(200);
				res.json({
					msg: 'La propiedad se creo correctamente',
					user: user,
					property: doc
				})
			})
		} else {
			const error = new Error('El usuario no es administrador')
			return res.status(401).json({ msg: error.message })
		}
	} catch (error) {
		handleConsoleColorError(error.message)
	}
}

const getOwnerships = async (req, res) => {
	handleConsoleColorInitFunction("Desde getOwnerships")
	try {
		const ownerships = await Ownerships.find()
		res.json(ownerships)
	} catch (error) {
		handleConsoleColorError(error.message)
	}
}

const getOwnershipsById = async (req, res) => {
	handleConsoleColorInitFunction('Desde getOwnershipsById')
	console.log(req.params.id)

	//Validar object id
	const { id } = req.params
	if (validateObjectId(id, res)) return

	//Validar que exista
	const ownerships = await Ownerships.findById(id)
	if (!ownerships) {
		return handleNotFoundError('La propiedad no existe', res)
	}

	//mostrar el servicio
	res.json(ownerships)
}

const updateOwnerships = async (req, res) => {
	handleConsoleColorInitFunction('Desde updateOwnerships')
	const user = req.user
	const admin = user.admin
	const { id } = req.params

	if (admin) {
		//Validar object id
		if (validateObjectId(id, res)) return

		//Validar que exista
		const ownerships = await Ownerships.findById(id)
		if (!ownerships) {
			return handleNotFoundError('El servicio no existe', res)
		}

		/* ownerships.name = req.body.name || ownerships.name
		ownerships.price = req.body.price || ownerships.price */

		try {
			await ownerships.save()
			res.json({
				msg: 'La propiedad se actualizó correctamente'
			})
		} catch (error) {
			handleConsoleColorError(error.message)
		}
	} else {
		const error = new Error('El usuario no es administrador')
		return res.status(401).json({ msg: error.message })
	}
}

const deleteOwnerships = async (req, res) => {
	handleConsoleColorInitFunction('Desde deleteOwnerships')
	const { id } = req.params
	const user = req.user
	const admin = user.admin

	if (admin) {
		//Validar object id
		if (validateObjectId(id, res)) return

		//Validar que exista
		const ownerships = await Ownerships.findById(id)
		if (!ownerships) {
			return handleNotFoundError('La propiedad no existe', res)
		}

		try {
			await ownerships.deleteOne()
			res.json({
				msg: 'La propiedad se eliminó correctamente'
			})
		} catch (error) {
			handleConsoleColorError(error.message)
		}
	} else {
		const error = new Error('El usuario no es administrador')
		return res.status(401).json({ msg: error.message })
	}
}

export {
	creatOwnerships,
	getOwnerships,
	getOwnershipsById,
	updateOwnerships,
	deleteOwnerships
}