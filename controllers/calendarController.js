import Calendar from '../models/Calendar.js'
import { calendarData } from '../data/calendar.js'
import { validateObjectId, handleConsoleColorInitFunction, handleConsoleColorError, handleNotFoundError } from '../utils/index.js';

let calendar = calendarData

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
	"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

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

const newYear = () => {
	calendarData.forEach(cal => {
		cal.año = 2023
		cal.semanas = 0
		cal.id_propiedad = 0

		cal.dias.forEach(dia => {
			dia.tipo = "sin uso"
			dia.temporada = ""
			dia.semana = ""
			dia.mes_compartido = ""
			dia._id = 0
		})
	})
}

const calendarPrototipe = (monthString, initial_date, finish_date, element) => {
	calendar = calendarData
	calendar.forEach((cal, i, array) => {
		if (cal.mes == monthString) {
			cal.dias.forEach(dia => {
				if (finish_date.getMonth() + 1 == initial_date.getMonth() + 1) {
					if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
						dia.tipo = element.tipo
						dia.temporada = element.temporada
						dia.semana = element.semana
						dia._id = element._id
					}
				}
				else if (finish_date.getMonth() + 1 > initial_date.getMonth() + 1) {
					if (dia.dia >= initial_date.getDate() && dia.dia > finish_date.getDate()) {
						dia.tipo = element.tipo
						dia.temporada = element.temporada
						dia.semana = element.semana
						dia.mes_compartido = monthNames[finish_date.getMonth()]
						dia._id = element._id
					}
					array[i + 1].dias.forEach(diaNM => {
						if (diaNM.dia <= finish_date.getDate()) {
							diaNM.tipo = element.tipo
							diaNM.temporada = element.temporada
							diaNM.semana = element.semana
							diaNM.mes_compartido = monthNames[initial_date.getMonth()]
							diaNM._id = element._id
						}
					})
				}
			})
		}
	})
}

const getMonths = async (req, res) => {
	try {
		newYear()
		const id_property = req.params.property
		const id_user = req.params.user
		const year = req.params.year
		let calendar = calendarData

		const response = await Calendar.find({ id_propiedad: id_property, id_usuario: id_user })
		if (!response) {
			return handleNotFoundError('No existe meses para esta propiedad', res)
		}

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
			console.log(initial_date.getFullYear)
			if (initial_date.getFullYear() == year) {
				console.log(initial_date.getMonth() + 1)
				switch (initial_date.getMonth() + 1) {
					case 1:
						calendarPrototipe("Enero", initial_date, finish_date, element)
						array_count.enero += 1
						calendar[0].año = year
						calendar[0].semanas = array_count.enero
						calendar[0].id_propiedad = element.id_propiedad
						break;
					case 2:
						/* calendar.forEach(cal => {
							if (cal.mes == "Febrero") {
								cal.dias.forEach(dia => {
									if (dia.dia >= initial_date.getDate() && dia.dia <= finish_date.getDate()) {
										dia.tipo = element.tipo
										dia.temporada = element.temporada
										dia.semana = element.semana
										dia._id = element._id
									}
								})
							}
						}) */
						calendarPrototipe("Febrero", initial_date, finish_date, element)
						array_count.febrero += 1
						calendar[1].año = year
						calendar[1].semanas = array_count.febrero
						calendar[1].id_propiedad = element.id_propiedad
						break;
					case 3:
						calendarPrototipe("Marzo", initial_date, finish_date, element)
						array_count.marzo += 1
						calendar[2].año = year
						calendar[2].semanas = array_count.marzo
						calendar[2].id_propiedad = element.id_propiedad
						break;
					case 4:
						calendarPrototipe("Abril", initial_date, finish_date, element)
						array_count.abril += 1
						calendar[3].año = year
						calendar[3].semanas = array_count.abril
						calendar[3].id_propiedad = element.id_propiedad
						break;
					case 5:
						calendarPrototipe("Mayo", initial_date, finish_date, element)
						array_count.mayo += 1
						calendar[4].año = year
						calendar[4].semanas = array_count.mayo
						calendar[4].id_propiedad = element.id_propiedad
						break;
					case 6:
						calendarPrototipe("Junio", initial_date, finish_date, element)
						array_count.junio += 1
						calendar[5].año = year
						calendar[5].semanas = array_count.junio
						calendar[5].id_propiedad = element.id_propiedad
						break;
					case 7:
						calendarPrototipe("Julio", initial_date, finish_date, element)
						array_count.julio += 1
						calendar[6].año = year
						calendar[6].semanas = array_count.julio
						calendar[6].id_propiedad = element.id_propiedad
						break;
					case 8:
						calendarPrototipe("Agosto", initial_date, finish_date, element)
						array_count.agosto += 1
						calendar[7].año = year
						calendar[7].semanas = array_count.agosto
						calendar[7].id_propiedad = element.id_propiedad
						break;
					case 9:
						calendarPrototipe("Septiembre", initial_date, finish_date, element)
						array_count.septiembre += 1
						calendar[8].año = year
						calendar[8].semanas = array_count.septiembre
						calendar[8].id_propiedad = element.id_propiedad
						break;
					case 10:
						calendarPrototipe("Octubre", initial_date, finish_date, element)
						array_count.octubre += 1
						calendar[9].año = year
						calendar[9].semanas = array_count.octubre
						calendar[9].id_propiedad = element.id_propiedad
						break;
					case 11:
						calendarPrototipe("Noviembre", initial_date, finish_date, element)
						array_count.noviembre += 1
						calendar[10].año = year
						calendar[10].semanas = array_count.noviembre
						calendar[10].id_propiedad = element.id_propiedad
						break;
					case 12:
						calendarPrototipe("Diciembre", initial_date, finish_date, element)
						array_count.diciembre += 1
						calendar[11].año = year
						calendar[11].semanas = array_count.diciembre
						calendar[11].id_propiedad = element.id_propiedad
						break;
					default:
						break;
				}
			}

			calendar[0].id_propiedad = element.id_propiedad
			calendar[0].año = year
			calendar[1].id_propiedad = element.id_propiedad
			calendar[1].año = year
			calendar[2].id_propiedad = element.id_propiedad
			calendar[2].año = year
			calendar[3].id_propiedad = element.id_propiedad
			calendar[3].año = year
			calendar[4].id_propiedad = element.id_propiedad
			calendar[4].año = year
			calendar[5].id_propiedad = element.id_propiedad
			calendar[5].año = year
			calendar[6].id_propiedad = element.id_propiedad
			calendar[6].año = year
			calendar[7].id_propiedad = element.id_propiedad
			calendar[7].año = year
			calendar[8].id_propiedad = element.id_propiedad
			calendar[8].año = year
			calendar[9].id_propiedad = element.id_propiedad
			calendar[9].año = year
			calendar[10].id_propiedad = element.id_propiedad
			calendar[10].año = year
			calendar[11].id_propiedad = element.id_propiedad
			calendar[11].año = year
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
		const finish_date = new Date(element.fecha_final)

		const initial_date_parse = ((initial_date.getDate() > 9) ? initial_date.getDate() : ('0' + initial_date.getDate())) + '/' + (monthNames[initial_date.getMonth()])
		const finish_date_parse = ((finish_date.getDate() > 9) ? finish_date.getDate() : ('0' + finish_date.getDate())) + '/' + (monthNames[finish_date.getMonth()])

		console.log(initial_date.getMonth() + 1 === month)
		if (initial_date.getFullYear() === year) {
			if (initial_date.getMonth() + 1 === month) {
				info.push({
					_id: element._id,
					tipo: element.tipo,
					fecha_inicio: initial_date_parse,
					fecha_final: finish_date_parse,
					temporada: element.temporada,
					año: initial_date.getFullYear()
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