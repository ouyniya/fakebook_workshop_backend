module.exports.newLike = (req, res, next) => {
    try {
        res.json({ msg: "new like" })
    } catch (error) {
        next(error)
    }
}

module.exports.unLike = () => {
    try {
        res.json({ msg: "delete like" })
    } catch (error) {
        next(error)
    }
}