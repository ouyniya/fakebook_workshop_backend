module.exports.newComment = (reg, res, next) => {
    try {
        res.json({ msg: "new comment" })
    } catch (error) {
        next(error)
    }
}