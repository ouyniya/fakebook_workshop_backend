require("dotenv").config()
const express = require("express")
const notFound = require("./middlewares/notFound")
const app = express()

// middlewares


// routing
app.use("/auth", (req, res) => { res.send("Auth") })
app.use("/post",  (req, res) => { res.send("Post") })
app.use("/comment", (req, res) => { res.send("comment") })
app.use("/like",  (req, res) => { res.send("like") })

// not found middlewares
app.use(notFound)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port: ${ port }`))