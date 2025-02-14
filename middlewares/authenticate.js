const createError = require("../utils/createError")
const jwt = require("jsonwebtoken")
const prisma = require("../models")

module.exports = async (req, res, next) => {
    try {
        
        const authorization = req.headers.authorization

        // console.log(authorization.split(" ")[0] !== "Bearer")
        
        // 1. check authorization
        // 1.1 there's authorization in req.headers
        // 1.2 correct format "Bearer <Token>"
        const authnArr = authorization.split(" ")
        if (!authorization || authnArr[0] !== "Bearer") {
            return createError(401, "Unauthorized")
        }

        const token = authnArr[1]
        if (!token) {
            return createError(401, "Unauthorized: no token")
        }
        // console.log(token)

        // 2. verify token: if correct return  payload
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(payload)

        // 3. find data from db
        const foundUser = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        })

        if (!foundUser) {
            return createError(400, "No user data.")
        }

        // 4. delete password and unused data
        // console.log(foundUser)
        const { password, createdAt, updatedAt, ...userData } = foundUser

        // 5. send to req body (key: user)
        req.user = userData

        next()
    } catch (error) {
        next(error)
    }
}