const createError = require("../utils/createError")
const prisma = require('../models')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const tryCatch = require("../utils/tryCatch");

function checkEmailOrMobile(identity) {
    const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const mobileRegEx = /^\+?([0-9]{3})\)?[ -]?([0-9]{3})[ -]?([0-9]{4})$/
    let identityKey = '' 

    // console.log(identity)
    
    if (emailRegEx.test(identity)) {
        identityKey = 'email'
    }

    // console.log(mobileRegEx.test(identity))

    if (mobileRegEx.test(identity)) {
        identityKey = 'mobile'
    } 
    
    if (!identityKey) {
        return createError(400, "Please provide email or mobile phone number")
    }

    return identityKey
}

module.exports.register = async (req, res, next) => {
    try {
        const {identity, firstName, lastName, password, confirmPassword} = req.body
        //validation
        if (!identity?.trim() || !firstName?.trim() || !lastName?.trim() || !password?.trim() || !confirmPassword?.trim()) {
            return createError(400, "Please fill all data.")
        }

        // identify email or phone number
        const identityKey = checkEmailOrMobile(identity)
        
        // find username in db (not dup)
        const findIdentity = await prisma.user.findUnique({
            where: {
                [identityKey]: identity,
            }
        })

        // create account in db 
        if (findIdentity) {
            return createError(409, `${identity} is already in use`)
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            [identityKey]: identity,
            firstName,
            lastName,
            password: hashedPassword,
        }
        
        await prisma.user.create({
            data: newUser
        })

        // return id
        const idx = await prisma.user.findFirst({
            where: {
                [identityKey]: identity,
            }
        })

        // console.log(idx)

        // response
        res.json({ msg: `Register successful`, 
            id: idx.id
         })

    } catch (error) {
        next(error)
    }
}


module.exports.login = tryCatch(
    async (req, res, next) => {
    
        const { identity, password } = req.body

        if (!identity.trim() || !password.trim()) {
            createError(400, "please fill all data")
        }

        const identifyKey = checkEmailOrMobile(identity)

        const foundUser = await prisma.user.findUnique({
            where: {
                [identifyKey]: identity,
            }
        })

        if (!foundUser) {
            createError(401, "Invalid login")
        }

        let pwOk = await bcrypt.compare(password, foundUser.password)
        if (!pwOk) {
            createError(401, "Invalid login")
        }

        // create token 
        const payload = { id: foundUser.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15d'})

        res.json({ msg: "login successful", token, user: foundUser })
        
        }
)

// module.exports.login = async (req, res, next) => {
//     try {
//         const { identity, password } = req.body

//         if (!identity.trim() || !password.trim()) {
//             createError(400, "please fill all data")
//         }

//         const identifyKey = checkEmailOrMobile(identity)

//         const foundUser = await prisma.user.findUnique({
//             where: {
//                 [identifyKey]: identity,
//             }
//         })

//         if (!foundUser) {
//             createError(401, "Invalid login")
//         }

//         let pwOk = await bcrypt.compare(password, foundUser.password)
//         if (!pwOk) {
//             createError(401, "Invalid login")
//         }

//         // create token 
//         const payload = { id: foundUser.id }
//         const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15d'})

//         res.json({ msg: "login successful", token, user: foundUser })

//     } catch (error) {
//         next(error)
//     }
// }

module.exports.getMe = (req, res, next) => {
    try {
        res.json({ msg: "get me" })
    } catch (error) {
        next(error)
    }
}