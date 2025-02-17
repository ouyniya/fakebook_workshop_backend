require("dotenv").config()
const prisma = require("../models")

// clear data in all dbs
// *** beware order of table to delete 
async function resetDatabase() {
    await prisma.$transaction([
        prisma.comment.deleteMany(),
        prisma.like.deleteMany(),
        prisma.post.deleteMany(),
        prisma.relationship.deleteMany(),
        prisma.user.deleteMany(),
    ])

    // reset index
    await prisma.$executeRawUnsafe("Alter Table User auto_increment = 1")
    
    // await prisma.$executeRawUnsafe(
    //     // "Alter Table User auto_increment = 1"
    //     "Drop database `cc-19-fackbook`"
    // )
    // await prisma.$executeRawUnsafe(
    //     "Create database `cc-19-fackbook`"
    // )
}

console.log("Reset db...")
resetDatabase()

