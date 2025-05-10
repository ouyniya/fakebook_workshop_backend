const tryCatch = require('../utils/tryCatch')
const cloudinary = require('../config/cloudinary')
const prisma = require('../models')
const createError = require('../utils/createError')
const fs = require('fs')
const { create } = require('domain')

module.exports.createPost = tryCatch( async (req, res) => {
	const {message } = req.body
	// console.log(req.file)
	const haveFile = !!req.file
	let uploadResult = {}
	if(haveFile){
		uploadResult = await cloudinary.uploader.upload(req.file.path)
		fs.unlinkSync(req.file.path)
	}
	// console.log(uploadResult)
	const data = {
		message : message,
		image : uploadResult.secure_url || '',
		userId : req.user.id
	}
	const rs = await prisma.post.create({ data : data})
	res.json(rs)
})


module.exports.getAllPosts = tryCatch(async (req, res) => {

	const rs = await prisma.post.findMany({
		orderBy: {createdAt : 'desc'},
		include: {
			user: {
				select: {
					firstName: true,
					lastName: true,
					profileImage: true
				}
			},
			comments: {
				include: {
					user: {
						select: {
							firstName: true,
							lastName: true,
							profileImage: true
						}
					}
				}
			},
			likes: {
				include: {
					user: {
						select: {
							firstName: true,
							lastName: true,
							profileImage: true
						}
					}
				}
			}
		}
	})

    res.json({ posts: rs })
})

module.exports.updatePost = async (req, res) => {

	try {

		const {id} = req.params
		const {message, removePic} = req.body

		const postData = await prisma.post.findUnique({
			where: {
				id: +id
			}
		})

		if (!postData || req.user.id !== postData.userId) {
			createError(400, 'Cannot edit this post')
		}

		const haveFile = !!req.file
		if (haveFile) {
			uploadResult = await cloudinary.uploader.upload(req.file.path)
			fs.unlinkSync(req.file.path)
		}

		let data = haveFile
		? { message, image: uploadResult.secure_url, userId: req.user.id }
		: { message, userId: req.user.id, image: removePic ? '' : postData.image}
		
		const rs = await prisma.post.update({
			where: { 
				id: +id
			},
			data
		})
	res.json({ msg: rs })
	
	} catch (error) {
		next(error)
	}
}

module.exports.deletePost = async (req, res, next) => {
	try {
		const {id} = req.params
		
	if (!id) { 
		createError(400, "Require parameter")
	}

	const postData = await prisma.post.findUnique({
		where: {
			id: Number(id)
		}
	})

	if (postData.userId !== req.user.id) {
		createError(403, "Cannot delete")
	}

	const rs = await prisma.post.delete({
		where: {
			id: Number(id)
		}
	})

    res.json({ msg: `Delete post id=${id} done` , postData: postData })


	} catch (error) {
		next(error)
	}
	
}