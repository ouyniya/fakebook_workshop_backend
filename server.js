require("dotenv").config()
const express = require("express")
const notFound = require("./middlewares/notFound")
const errorMiddleware = require("./middlewares/errorMiddleware")
const authRoute = require("./routes/auth-route")
const postRouter = require("./routes/post-route")
const commentRouter = require("./routes/comment-route")
const likeRouter = require("./routes/like-route")
const helmet = require("helmet")
const cors = require("cors")
const morgan = require("morgan")
const app = express()
const multer = require('multer')



// middlewares
app.use(express.json())
app.use(express.urlencoded()) // deal with form data 
app.use(helmet())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors({
    origin: 'http://localhost:5173'
}))

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