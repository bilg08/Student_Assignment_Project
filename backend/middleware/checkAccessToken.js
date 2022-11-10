const jwt = require('jsonwebtoken')

module.exports.checkAccessToken = async(req,res,next) => {
    const token = req.headers.authorization;
    
    try {
        const user = await jwt.verify(token,`SECRET_KEY_JWT`) ;
        req.user.id = user.id;
        next();
    } catch (error) {
       
    }

}