const express = require("express")
const { register, login, getMe } = require("../controllers/auth-controller")
const authRoute = express.Router()

authRoute.post("/register", register)

authRoute.post("/login", login)

authRoute.get("/me", getMe)

module.exports = authRoute;