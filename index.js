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
const whiteList = [process.env.FRONTEND_URL]
if (process.argv[2] === '--postman') {
	whiteList.push(undefined)
}

const corsOptions = {
	origin: function (origin, callback) {
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