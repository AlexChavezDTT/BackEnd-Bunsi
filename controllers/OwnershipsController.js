import Ownerships from '../models/Ownerships.js'
import User from '../models/Users.js'
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

const getOwnershipsByUser = async (req, res) => {
	handleConsoleColorInitFunction("getOwnershipsByUser")
	try {
		const id_user = req.params.user;

		const response_user = await User.findById(id_user)
		const properties_user = response_user.properties
		if (!response_user) {
			return handleNotFoundError('No existe el usuario')
		}

		const ownerships_user = []
		for (let index = 0; index < properties_user.length; index++) {
			const element = properties_user[index];
			const ownership = await Ownerships.findById(element.id_propertie)
			ownerships_user.push({
				id: ownership._id,
				name: ownership.titulo
			})
		}

		res.json(ownerships_user)
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

		ownerships.lat = req.body.lat || ownerships.lat
		ownerships.lon = req.body.lon || ownerships.lon
		ownerships.titulo = req.body.titulo || ownerships.titulo
		ownerships.descripcion = req.body.descripcion || ownerships.descripcion
		ownerships.descripcionEn = req.body.descripcionEn || ownerships.descripcionEn
		ownerships.image = req.body.image || ownerships.image
		ownerships.width = req.body.width || ownerships.width

		ownerships.caracteristicas.metros = req.body.caracteristicas.metros || ownerships.caracteristicas.metros
		ownerships.caracteristicas.habitaciones = req.body.caracteristicas.habitaciones || ownerships.caracteristicas.habitaciones
		ownerships.caracteristicas.banos = req.body.caracteristicas.banos || ownerships.caracteristicas.banos
		ownerships.caracteristicas.precioMXN = req.body.caracteristicas.precioMXN || ownerships.caracteristicas.precioMXN
		ownerships.caracteristicas.precioUSD = req.body.caracteristicas.precioUSD || ownerships.caracteristicas.precioUSD
		ownerships.caracteristicas.fracciones = req.body.caracteristicas.fracciones || ownerships.caracteristicas.fracciones
		ownerships.caracteristicas.disponibles = req.body.caracteristicas.disponibles || ownerships.caracteristicas.disponibles
		ownerships.caracteristicas.impuestos = req.body.caracteristicas.impuestos || ownerships.caracteristicas.impuestos
		ownerships.caracteristicas.fondoReserva = req.body.caracteristicas.fondoReserva || ownerships.caracteristicas.fondoReserva
		ownerships.caracteristicas.segurosFinanzas = req.body.caracteristicas.segurosFinanzas || ownerships.caracteristicas.segurosFinanzas
		ownerships.caracteristicas.fideicomiso = req.body.caracteristicas.fideicomiso || ownerships.caracteristicas.fideicomiso
		ownerships.caracteristicas.bunsifee = req.body.caracteristicas.bunsifee || ownerships.caracteristicas.bunsifee
		ownerships.caracteristicas.mantenimiento = req.body.caracteristicas.mantenimiento || ownerships.caracteristicas.mantenimiento
		ownerships.caracteristicas.renta_temporadas = req.body.caracteristicas.renta_temporadas || ownerships.caracteristicas.renta_temporadas
		/* ownerships.caracteristicas.mantenimiento.limpieza = req.body.caracteristicas.mantenimiento.limpieza || ownerships.caracteristicas.mantenimiento.limpieza
		ownerships.caracteristicas.mantenimiento.reparaciones = req.body.caracteristicas.mantenimiento.reparaciones || ownerships.caracteristicas.mantenimiento.reparaciones
		ownerships.caracteristicas.mantenimiento.piscina = req.body.caracteristicas.mantenimiento.piscina || ownerships.caracteristicas.mantenimiento.piscina */

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
	deleteOwnerships,
	getOwnershipsByUser
}