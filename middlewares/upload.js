const multer = require("multer");
// const path = require('path')

// console.log(__dirname)

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'upload/') 
// }) 

// module.exports = multer({ storage: storage })
// temporary storage (path)

module.exports = multer({ dest: 'upload/' })