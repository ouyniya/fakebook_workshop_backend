module.exports.register = (req, res, next) => {
    try {
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