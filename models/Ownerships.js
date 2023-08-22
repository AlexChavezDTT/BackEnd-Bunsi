import mongoose from 'mongoose'

const OwnershipSchema = new mongoose.Schema({
	lat: {
		type: Number
	},
	lon: {
		type: Number
	},
	titulo: {
		type: String
	},
	descripcion: {
		type: String
	},
	descripcionEn: {
		type: String
	},
	image: {
		type: String
	},
	width: {
		type: String
	},
	caracteristicas: {
		metros: {
			type: String
		},
		habitaciones: {
			type: String
		},
		banos: {
			type: String
		},
		precioMXN: {
			type: Number
		},
		precioUSD: {
			type: String
		},
		fracciones: {
			type: String
		},
		disponibles: {
			type: String
		},
		impuestos: {
			type: Number
		},
		fondoReserva: {
			type: Number
		},
		segurosFinanzas: {
			type: Number
		},
		fideicomiso: {
			type: Number
		},
		bunsifee: {
			type: Number
		},
		mantenimiento: {
			limpieza: {
				type: Number
			},
			reparaciones: {
				type: Number
			},
			piscina: {
				type: Number
			}
		},
		renta_temporadas: {
			alta: {
				type: Number
			},
			media: {
				type: Number
			},
			baja: {
				type: Number
			}
		}
	},
	carouselImages: {
		type: Object
	},
	conoceMas: {
		vision: {
			titulo: {
				type: String
			},
			image: {
				type: String
			}
		},
		ubicacion: {
			titulo: { type: String },
			image: { type: String },
			lat: { type: Number },
			lon: { type: Number }
		},
		planos: {
			titulo: { type: String },
			image: { type: String }
		},
		specs: {
			titulo: { type: String },
			natural: {
				playas: [{
					nombre: { type: String },
					kilometros: { type: String }
				}],
				montañas: [{
					nombre: { type: String },
					kilometros: { type: String }
				}],
			},
			experiencias: {
				excursiones: [{
					nombre: { type: String }
				}],
				tour: [{
					nombre: { type: String }
				}]
			},
			social: {
				restaurantes: [{
					nombre: { type: String }
				}],
				tiendas: [{
					nombre: { type: String },
					kilometros: { type: String }
				}],
			},
			experiencias: {
				excursiones: [{
					nombre: { type: String }
				}],
				tour: [{
					nombre: { type: String }
				}]
			},
			cultura: {
				musica: [{
					nombre: { type: String }
				}],
				deporte: [{
					nombre: { type: String }
				}],
			},
			salud: {
				hospitales: [{
					nombre: { type: String }
				}]
			}
		},
		simulador: {
			titulo: { type: String },
			image: { type: String },
			inversion: { type: Number },
			costovivienda: { type: Number }
		}
	}
})

const Ownerships = mongoose.model('Ownerships', OwnershipSchema);

export default Ownerships;