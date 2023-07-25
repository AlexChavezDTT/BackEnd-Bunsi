import Calendar from '../models/Calendar.js'
import { calendar } from '../data/calendar.js'
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

const getMonths = async (req, res) => {
	try {
		const id_property = req.params.property;
		const id_user = req.params.user;

		const response = await Calendar.find({ id_propiedad: id_property, id_usuario: id_user })
		if (!response) {
			return handleNotFoundError('No existe meses para esta propiedad', res)
		}

		const info = [];

		//Enero
		/* let obj_temp_enero = {}
		obj_temp_enero["Enero"] = {
			año: "",
			dias: []
		}
		for (let index = 1; index = 31; index++) {
			response.forEach(element => {
				const initial_date = new Date(element.fecha_inicio)
				const finish_date = new Date(element.fecha_final)
				obj_temp_enero["Enero"].año = initial_date.getFullYear()
				if (initial_date.getMonth() + 1 == 1) {
					if (index >= initial_date.getDate() && index <= finish_date.getDate()) {
						obj_temp_enero["Enero"].dias.push({
							dia: index,
							tipo: element.tipo
						})
					} else {
						obj_temp_enero["Enero"].dias.push({
							dia: index,
							tipo: "Sin asignar"
						})
					}
				}
			})
			info.push(obj_temp_enero)
		} */

		const array_count = {
			enero: 0,
			febrero: 0,
			marzo: 0,
			abril: 0,
			mayo: 0,
			junio: 0,
			julio: 0,
			agosto: 0,
			septiembre: 0,
			octubre: 0,
			noviembre: 0,
			diciembre: 0
		}

		response.forEach(element => {
			const initial_date = new Date(element.fecha_inicio)
			const finish_date = new Date(element.fecha_final)
			if (initial_date.getMonth() + 1 == 1) {
				calendar.forEach(cal => {
					if (cal.mes == "Enero") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.enero += 1
				calendar[0].semanas = array_count.enero
				calendar[0].id_propiedad = element.id_propiedad
			}
			if (initial_date.getMonth() + 1 == 2) {
				calendar.forEach(cal => {
					if (cal.mes == "Febrero") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.febrero += 1
				calendar[1].semanas = array_count.febrero
				calendar[1].id_propiedad = element.id_propiedad
			}
			if (initial_date.getMonth() + 1 == 3) {
				calendar.forEach(cal => {
					if (cal.mes == "Marzo") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.marzo += 1
				calendar[2].semanas = array_count.marzo
				calendar[2].id_propiedad = element.id_propiedad
			}
			if (initial_date.getMonth() + 1 == 4) {
				calendar.forEach(cal => {
					if (cal.mes == "Abril") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.abril += 1
				calendar[3].semanas = array_count.abril
				calendar[3].id_propiedad = element.id_propiedad
			}
			if (initial_date.getMonth() + 1 == 5) {
				calendar.forEach(cal => {
					if (cal.mes == "Mayo") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.mayo += 1
				calendar[4].semanas = array_count.mayo
				calendar[4].id_propiedad = element.id_propiedad
			}
			if (initial_date.getMonth() + 1 == 6) {
				calendar.forEach(cal => {
					if (cal.mes == "Junio") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.junio += 1
				calendar[5].semanas = array_count.junio
				calendar[5].id_propiedad = element.id_propiedad
			}
			if (initial_date.getMonth() + 1 == 7) {
				calendar.forEach(cal => {
					if (cal.mes == "Julio") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.julio += 1
				calendar[6].semanas = array_count.julio
				calendar[6].id_propiedad = element.id_propiedad
			}
			if (initial_date.getMonth() + 1 == 8) {
				calendar.forEach(cal => {
					if (cal.mes == "Agosto") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.agosto += 1
				calendar[7].semanas = array_count.agosto
				calendar[7].id_propiedad = element.id_propiedad
			}
			if (initial_date.getMonth() + 1 == 9) {
				calendar.forEach(cal => {
					if (cal.mes == "Septiembre") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.septiembre += 1
				calendar[8].semanas = array_count.septiembre
				calendar[8].id_propiedad = element.id_propiedad
			}
			if (initial_date.getMonth() + 1 == 10) {
				calendar.forEach(cal => {
					if (cal.mes == "Octubre") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.octubre += 1
				calendar[9].semanas = array_count.octubre
				calendar[9].id_propiedad = element.id_propiedad
			}
			if (initial_date.getMonth() + 1 == 11) {
				calendar.forEach(cal => {
					if (cal.mes == "Noviembre") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.noviembre += 1
				calendar[10].semanas = array_count.noviembre
				calendar[10].id_propiedad = element.id_propiedad
			}
			if (initial_date.getMonth() + 1 == 12) {
				calendar.forEach(cal => {
					if (cal.mes == "Diciembre") {
						cal.dias.forEach(dia => {
							if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
								dia.tipo = element.tipo
								dia._id = element._id
							}
						})
					}
				})
				array_count.diciembre += 1
				calendar[11].semanas = array_count.diciembre
				calendar[11].id_propiedad = element.id_propiedad
			}

			calendar[0].id_propiedad = element.id_propiedad
			calendar[1].id_propiedad = element.id_propiedad
			calendar[2].id_propiedad = element.id_propiedad
			calendar[3].id_propiedad = element.id_propiedad
			calendar[4].id_propiedad = element.id_propiedad
			calendar[5].id_propiedad = element.id_propiedad
			calendar[6].id_propiedad = element.id_propiedad
			calendar[7].id_propiedad = element.id_propiedad
			calendar[8].id_propiedad = element.id_propiedad
			calendar[9].id_propiedad = element.id_propiedad
			calendar[10].id_propiedad = element.id_propiedad
			calendar[11].id_propiedad = element.id_propiedad

			/* info.push({
				_id: element._id,
				id_usuario: element.id_usuario,
				id_propiedad: element.id_propiedad,
				dia_inicio: initial_date.getDate(),
				mes_inicio: initial_date.getMonth() + 1,
				año_inicio: initial_date.getFullYear(),
				dia_final: finish_date.getDate(),
				mes_final: finish_date.getMonth() + 1,
				año_final: finish_date.getFullYear(),
				tipo: element.tipo
			}) */
		});

		//mostrar el servicio
		res.json(calendar)
	} catch (error) {
		handleConsoleColorError(error.message)
	}
}

const getWeeksOfMonth = async (req, res) => {
	const id_property = req.params.property;
	const id_user = req.params.user;
	const year = Number(req.params.year);
	const month = Number(req.params.month);

	console.log(id_property, id_user, year, month)

	const response = await Calendar.find({ id_propiedad: id_property, id_usuario: id_user })
	if (!response) {
		return handleNotFoundError('No existe meses para esta propiedad', res)
	}

	const info = [];

	response.forEach(element => {
		const initial_date = new Date(element.fecha_inicio)

		console.log(initial_date.getMonth() + 1 === month)
		if (initial_date.getFullYear() === year) {
			if (initial_date.getMonth() + 1 === month) {
				info.push({
					_id: element._id,
					tipo: element.tipo
				})
			}
		}
	})

	res.json(info)
}

const updateWeeks = async (req, res) => {
	try {
		const body = req.body
		const msg = []

		body.forEach(ele => {
			const body_temp = {
				tipo: ele.tipo
			}
			Calendar.findByIdAndUpdate(ele._id, body_temp).then(doc => {
				msg.push({
					msg: `El calendario ${doc._id} se ha actualizado correctamente`
				})
			});
		})

		res.json(msg)
	} catch (error) {
		console.log("error", error)
	}
}

export {
	createCalendar,
	getMonths,
	getWeeksOfMonth,
	updateWeeks
}