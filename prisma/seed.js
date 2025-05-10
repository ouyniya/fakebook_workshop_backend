const prisma = require("../models")
const bcrypt = require("bcryptjs")

// npx prisma db seed

const hashedPassword = bcrypt.hashSync('123456', 10)

const userData = [
    {
        firstName: 'Andy',
        lastName: 'Codecamp',
        email: 'andy@ggg.com',
        password: hashedPassword,
        profileImage: 'https://picsum.photos/id/17/50/50'
    },
    {
        firstName: 'Bobby',
        lastName: 'Codecamp',
        email: 'bobby@ggg.com',
        password: hashedPassword,
        profileImage: 'https://picsum.photos/id/25/50/50'
    },
    {
        firstName: 'Candy',
        lastName: 'Codecamp',
        mobile: '1111111111',
        password: hashedPassword,
        profileImage: 'https://picsum.photos/id/99/50/50'
    },
    {
        firstName: 'Danny',
        lastName: 'Codecamp',
        mobile: '2222222222',
        password: hashedPassword,
        profileImage: 'https://picsum.photos/id/55/50/50'
    }
]

console.log('db seed...')

async function seedDB() {
    await prisma.user.createMany({ data: userData })
}

seedDB()