require("dotenv").config()
const express = require("express")
const notFound = require("./middlewares/notFound")
const errorMiddleware = require("./middlewares/errorMiddleware")
const authRoute = require("./routes/auth-route")
const postRouter = require("./routes/post-route")
const commentRouter = require("./routes/comment-route")
const likeRouter = require("./routes/like-route")
const app = express()

// middlewares


// routing
app.use("/auth", authRoute)
app.use("/post", postRouter)
app.use("/comment", commentRouter)
app.use("/like",  likeRouter)

// not found middlewares
app.use(notFound)

// err middlewares
app.use(errorMiddleware)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port: ${ port }`))