const createError = require("../utils/createError")

module.exports.register = (req, res, next) => {
    try {
        const {identity, firstName, lastName, password, confirmPassword} = req.body

        //validation
        if (!identity?.trim() || !firstName?.trim() || !lastName?.trim() || !password?.trim() || !confirmPassword?.trim()) {
            return createError(400, "Please fill all data.")
        }
        res.json({ msg: "Register..." })

    } catch (error) {
        next(error)
    }
}

module.exports.login = (req, res, next) => {
    try {
        res.json({ msg: "login..." })
    } catch (error) {
        next(error)
    }
}

module.exports.getMe = (req, res, next) => {
    try {
        res.json({ msg: "get me" })
    } catch (error) {
        next(error)
    }
}