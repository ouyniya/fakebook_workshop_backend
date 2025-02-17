require("dotenv").config()
const prisma = require("../models")

// clear data in all dbs

async function resetDatabase () {
    // get table names 
    const tableName = Object.keys(prisma)
        .filter(key => {
            return !key.startsWith('$') && !key.startsWith('_')
        })
    // console.log(tableName)

    // async await use for of only!!!
    for (let table of tableName) {
        console.log(`Reset DB and Auto_increment : ${table}`)
        await prisma[table].deleteMany()
        await prisma.$executeRawUnsafe(`Alter Table \`${table}\` auto_increment = 1`)
    }

}

resetDatabase()

