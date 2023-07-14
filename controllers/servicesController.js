import Services from '../models/Services.js';
import { validateObjectId, handleConsoleColorInitFunction, handleConsoleColorError, handleNotFoundError } from '../utils/index.js';

const createService = async (req, res) => {
	handleConsoleColorInitFunction("Desde createServices")
	if (Object.values(req.body).includes('')) {
		const error = new Error('Todos los campos son obligatorios')
		return res.status(400).json({
			msg: error.message
		})
	}
	try {
		const service = new Services(req.body)
		const result = await service.save()
		res.json({
			msg: 'El servicio se creo correctamente'
		})
	} catch (error) {
		handleConsoleColorError(error.message)
	}
}

const getServices = async (req, res) => {
	handleConsoleColorInitFunction("Desde getServices")
	try {
		const services = await Services.find()
		res.json(services)
	} catch (error) {
		handleConsoleColorError(error.message)
	}
}

const getServiceById = async (req, res) => {
	handleConsoleColorInitFunction('Desde getServiceById')
	console.log(req.params.id)

	//Validar object id
	const { id } = req.params
	if (validateObjectId(id, res)) return

	//Validar que exista
	const service = await Services.findById(id)
	if (!service) {
		return handleNotFoundError('El servicio no existe', res)
	}

	//mostrar el servicio
	res.json(service)
}

const updateService = async (req, res) => {
	handleConsoleColorInitFunction('Desde updateService')
	const { id } = req.params
	//Validar object id
	if (validateObjectId(id, res)) return

	//Validar que exista
	const service = await Services.findById(id)
	if (!service) {
		return handleNotFoundError('El servicio no existe', res)
	}

	service.name = req.body.name || service.name
	service.price = req.body.price || service.price

	try {
		await service.save()
		res.json({
			msg: 'El servicio se actualizó correctamente'
		})
	} catch (error) {
		handleConsoleColorError(error.message)
	}
}

const deleteService = async (req, res) => {
	handleConsoleColorInitFunction('Desde deleteService')
	const { id } = req.params
	//Validar object id
	if (validateObjectId(id, res)) return

	//Validar que exista
	const service = await Services.findById(id)
	if (!service) {
		return handleNotFoundError('El servicio no existe', res)
	}

	try {
		await service.deleteOne()
		res.json({
			msg: 'El servicio se eliminó correctamente'
		})
	} catch (error) {
		handleConsoleColorError(error.message)
	}
}

export {
	getServices,
	createService,
	getServiceById,
	updateService,
	deleteService
}