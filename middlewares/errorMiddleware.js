const handleErrors = (err, req, res, next) => {

    // err from util > createError
    // console.log(err)

    res
        .status(err.statusCode || 500)
        .json({ 
            message: err.message || "Internal server error!!!" 
        })
    
}

module.exports = handleErrors;