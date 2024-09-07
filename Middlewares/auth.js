const jwt = require('jsonwebtoken')

module.exports.veriftyUserToken = async (req , res , next) => {

    try{
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            res.status(401).json({message : "No token in the headers"})
        } else {
            jwt.verify(token , process.env.JWT_SECRET , (err , decoded) => {
                if(err) {
                    res.status(401).json({message : "Error in verification of jwt"})
                } else {
                    req.userId = decoded.userId
                    next()
                }
            })
        }
    }catch(err) {
    }
}