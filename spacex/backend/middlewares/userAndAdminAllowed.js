const jwt = require("jsonwebtoken")
const User = require('../models/users')

async function userAndAdminAllowed(req, res, next) {
    const PASSWORD = process.env.TOKEN_PASSWORD
    let token = req.token

    if (token === undefined) {
        return res.status(403).json({
            success: false,
            message: 'Debes estar autenticado para usar este servicio.'
        });
    }

    if (token !== undefined) {
        try {
            let decodedToken = await jwt.verify(req.token, PASSWORD)

            req.user = decodedToken



            //comprobar si el usuario sigue existiendo en la base datos
            let foundUser = await User.findOne({ id: token._id }).exec()

            if (!foundUser) {
                res.status(403).json({ success: false, message: 'El usuario autenticado ya no está en el sistema' })
                return
            }

            //que su perfil es el adecuado para la acción que ha solictado
            if (decodedToken.profile !== 'user' && decodedToken.profile !== 'admin') {
                res.status(403).json({ success: false, message: 'Debes ser usuario para poder crear elementos.' })
                return
            }

            next()

        } catch (e) {
            res.status(403).json({ status: false, message: 'No hemos podido comprobar las credenciales, autentícate nuevamente.' })
            return
        }
    }
}


module.exports = userAndAdminAllowed
