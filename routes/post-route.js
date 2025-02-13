const express = require("express")
const postRouter = express.Router()

postRouter.get("/", (req, res) => res.send("get post"))

postRouter.post("/", (req, res) => res.send("post post"))

postRouter.put("/", (req, res) => res.send("put post"))

postRouter.delete("/", (req, res) => res.send("del post"))

module.exports = postRouter;