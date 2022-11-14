const jwt = require('jsonwebtoken')

module.exports.checkAccessToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return
    }
    try {
        const user = await jwt.verify(token, process.env.JSON_WEB_TOKEN);
        req.user = user;
        console.log(user)
    } catch (error) {

    }
    next();

}