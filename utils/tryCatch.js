// module.exports = (func) => (req, res, next) => func(req, res, next).catch(next)

// create try catch function
module.exports = myFunc => {
    return async function (req, res, next) {
        try {
            await myFunc(req, res, next) 
        } catch (error) {
            next(error)
        }
    }
}