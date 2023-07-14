import mongoose from 'mongoose'
import colors from 'colors'

export const db = async () => {
	try {
		const db = await mongoose.connect(process.env.MONGO_URI)
		const url = colors.brightYellow.bold(`${db.connection.host}:${db.connection.port}`)
		console.log(colors.cyan('Se conecto a MONGODB:'), url)
	} catch (error) {
		console.log(`Error: ${error.message}`)
		process.exit(1)
	}
}