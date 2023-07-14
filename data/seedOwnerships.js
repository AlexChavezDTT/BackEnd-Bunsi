import dotenv from 'dotenv'
import { db } from '../config/db.js'
import Ownerships from '../models/Ownerships.js';
import { ownerships } from './dataOwnerships.js';
import { handleConsoleColorInitFunction, handleConsoleColorError, handleConsoleColorSuccess } from '../utils/index.js';

dotenv.config()
await db()

async function seedDB() {
	handleConsoleColorInitFunction("desde seedDB")
	try {
		await Ownerships.insertMany(ownerships)
		handleConsoleColorSuccess('Se agregaron los datos correctamente')
		process.exit()
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

async function clearDB() {
	handleConsoleColorInitFunction("desde clearDB")
	try {
		await Ownerships.deleteMany()
		handleConsoleColorSuccess('Se eliminaron los datos correctamente')
		process.exit()
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

if (process.argv[2] === '--import') {
	seedDB()
} else {
	clearDB()
}