import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import ownershipsRoutes from './routes/ownershipsRoutes.js'
import calendarRoutes from './routes/calendarRoutes.js'
import { db } from './config/db.js'

//CONFIGURAR LA APP
dotenv.config()
const app = express()

//LEER DATOS VIA BODY
app.use(express.json())

//CONECTAR A BD
db()

//CONFIGURAR CORS
const whiteList = [process.env.FRONTEND_URL, process.env.BACKEND_URL]
if (process.argv[2] === '--postman') {
	whiteList.push(undefined)
}

const corsOptions = {
	origin: function (origin, callback) {
		console.log("origin", origin)
		if (whiteList.includes(origin)) {
			//Permite la conexion
			callback(null, true)
		} else {
			//Deniega la conexion
			callback(new Error('Error de CORS'))
		}
	}
}
app.use(cors(corsOptions))

app.get("/", (req, res) => {
	//res.status(404);
	res.json({
		msg: "Bienvenido al BackEnd de Bunsi",
		author: "DisrupTT S.A. de C.V.",
		año: "2023",
		mes: "Julio",
		version: "1.0.0",
		desarrolladores: [
			{
				name: "Alejandro Chavez",
				correo: "alejandro.chavez@disruptt.mx",
				puesto: "FrontEnd & BackEnd"
			},
			{
				name: "Conrado Carrillo",
				correo: "conrado.carrillo@disruptt.mx",
				puesto: "FrontEnd & BackEnd"
			},
		],
		tecnologias: [
			{
				name: "NodeJS",
				version: "19.0.1"
			},
			{
				name: "ExpressJS",
				version: "4.18.2"
			},
			{
				name: "MongoDB",
				version: "1.38.2"
			},
		]
	});
});

//DEFINIR RUTA
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/ownerships', ownershipsRoutes)
app.use('/api/calendar', calendarRoutes)

//DEFINIR PUERTO
const PORT = process.env.PORT || 4000

//ARRANCAR APP
app.listen(PORT, () => {
	console.log(colors.blue('El servidor se esta ejecutando en el puerto: '), colors.yellow.bold(PORT))
})