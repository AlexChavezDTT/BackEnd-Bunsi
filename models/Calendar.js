import mongoose from 'mongoose'

const calendarSchema = mongoose.Schema({
	id_propiedad: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	id_usuario: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	fecha_inicio: {
		type: Date,
		required: true
	},
	fecha_final: {
		type: Date,
		required: true
	},
	tipo: {
		type: String,
		required: true
	},
	fecha_creacion: {
		type: Date,
		required: true
	},
	fecha_modificacion: {
		type: Date,
		required: true
	}
})

const Calendar = mongoose.model('Calendar', calendarSchema)
export default Calendar