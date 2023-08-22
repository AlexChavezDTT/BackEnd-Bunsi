import Ownerships from '../models/Ownerships.js'
import Calendar from '../models/Calendar.js'
import User from '../models/Users.js'
import { validateObjectId, handleConsoleColorInitFunction, handleConsoleColorError, handleNotFoundError } from '../utils/index.js';

const monthlyCalculation = async (req, res) => {
	const id_property = req.params.property;
	const id_user = req.params.user;
	const year = Number(req.params.year);
	const month = Number(req.params.month);

	const response_propertie = await Ownerships.findById(id_property)
	if (!response_propertie) {
		return handleNotFoundError('Error al obetner esta propiedad', res)
	}
	const propertie_characteristics = response_propertie.caracteristicas
	const t_alta = Number(propertie_characteristics.renta_temporadas.alta)
	const t_media = Number(propertie_characteristics.renta_temporadas.media)
	const t_baja = Number(propertie_characteristics.renta_temporadas.baja)

	const response = await Calendar.find({ id_propiedad: id_property, id_usuario: id_user })
	if (!response) {
		return handleNotFoundError('No existe meses para esta propiedad', res)
	}

	const info = {
		total_mes: 0,
		t_alta: 0,
		t_media: 0,
		t_baja: 0
	};

	response.forEach(element => {
		const initial_date = new Date(element.fecha_inicio)

		console.log(initial_date.getMonth() + 1 === month)
		if (initial_date.getFullYear() === year) {
			if (initial_date.getMonth() + 1 === month) {
				if (element.temporada === 'ALTA' && element.tipo === "Libre/Renta") {
					info.t_alta += t_alta
				}
				if (element.temporada === 'MEDIA' && element.tipo === "Libre/Renta") {
					info.t_media += t_media
				}
				if (element.temporada === 'BAJA' && element.tipo === "Libre/Renta") {
					info.t_baja += t_baja
				}
			}
		}
	})

	info.total_mes = info.t_alta + info.t_media + info.t_baja

	res.json(info)
}

export {
	monthlyCalculation
}