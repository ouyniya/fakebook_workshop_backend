const express = require("express")
const postRouter = express.Router()
const postController = require('../controllers/post-controller')
const upload = require('../middlewares/upload')
const authenticate = require("../middlewares/authenticate")


postRouter.get("/", authenticate ,postController.getAllPosts)

postRouter.post("/",  authenticate ,upload.single('image'), postController.createPost)

postRouter.put("/:id", authenticate ,upload.single('image') ,postController.updatePost)

postRouter.delete("/:id", authenticate ,postController.deletePost)

module.exports = postRouter;