import User from '../models/Users.js';
import { sendEmailVerification } from '../emails/authEmailService.js';
import { generateJWT } from '../utils/index.js'

const register = async (req, res) => {
	console.log(req.body)

	//VALIDA TODOS LOS CAMPOS
	if (Object.values(req.body).includes('')) {
		const error = new Error('Todos los campos son obligatorios')
		return res.status(400).json({
			msg: error.message
		})
	}

	const { email, password, name } = req.body

	//EVITAR DATOS DUPLICADOS
	const userExists = await User.findOne({ email })
	if (userExists) {
		const error = new Error('Usuario ya registrado')
		return res.status(400).json({
			msg: error.message
		})
	}

	//VALIDAR LA EXTENSION DEL PASSWORD
	const MIN_PASSWORD_LENGTH = 8
	if (password.trim().length < MIN_PASSWORD_LENGTH) {
		const error = new Error(`La contraseña debe contener ${MIN_PASSWORD_LENGTH} caracteres`)
		return res.status(400).json({
			msg: error.message
		})
	}

	try {
		const user = new User(req.body)
		const result = await user.save()
		const { name, email, token } = result

		sendEmailVerification({
			name,
			email,
			token
		})

		res.json({
			msg: 'El usuario se creo correctamente, revisa tu email para verificarlo'
		})
	} catch (error) {
		console.log("error", error)
	}
}

const verifyAccount = async (req, res) => {
	const { token } = req.params
	const user = await User.findOne({ token })
	if (!user) {
		const error = new Error('Hubo un error, token no válido')
		return res.status(401).json({ msg: error.message })
	}

	//SI EL TOKEN ES VALIDO, CONFIRMAR LA CUENTA
	try {
		user.verified = true
		user.token = ''
		await user.save();
		res.json({ msg: 'Usuario confirmado correctamente' })
	} catch (error) {
		console.log(error)
	}
}

const login = async (req, res) => {
	const { email, password } = req.body
	//REVISAR QUE EL USUARIO EXISTA
	const user = await User.findOne({ email })
	if (!user) {
		const error = new Error('El usuario no existe')
		return res.status(401).json({ msg: error.message })
	}

	//VERIFICAR QUE EL USUARIO VERIFICO SU CUENTA
	if (!user.verified) {
		const error = new Error('Tu cuenta no ha sido confirmado aún')
		return res.status(401).json({ msg: error.message })
	}

	//VERIFICAR EL PASSWORD
	if (await user.checkPassword(password)) {
		const token = generateJWT(user._id)
		res.json({
			token
		})
	} else {
		const error = new Error('El password es incorrecto')
		return res.status(401).json({ msg: error.message })
	}
}

const user = async (req, res) => {
	const user = req.user
	res.json(
		user
	)
}

export {
	register,
	verifyAccount,
	login,
	user
}