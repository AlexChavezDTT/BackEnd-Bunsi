import mongoose from 'mongoose'
import colors from 'colors'
import jwt from 'jsonwebtoken'

function validateObjectId(id, res) {
	//Validar object id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = new Error('El ID no es valido')
		return res.status(400).json({
			msg: error.message
		})
	}
}

function handleConsoleColorInitFunction(msg) {
	return console.log(colors.dim.underline(msg))
}

function handleConsoleColorError(msg) {
	return console.log(colors.red.underline(msg))
}

function handleConsoleColorSuccess(msg) {
	return console.log(colors.green.underline.bold(msg))
}

function handleNotFoundError(message, res) {
	const error = new Error(message)
	return res.status(404).json({
		msg: error.message
	})
}

const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)

const generateJWT = (id) => {
	const token = jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d'
	})

	return token
}

//Token
function ensureToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	console.log(bearerHeader);
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next()
	} else {
		res.sendStatus(403);
	}
}

export {
	validateObjectId,
	handleConsoleColorInitFunction,
	handleConsoleColorError,
	handleNotFoundError,
	handleConsoleColorSuccess,
	uniqueId,
	generateJWT,
	ensureToken
}