const express = require("express");
const { newComment } = require("../controllers/comment-controller");
const commentRouter = express.Router()

commentRouter.post("/", newComment)

module.exports = commentRouter;