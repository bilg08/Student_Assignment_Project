const jwt = require('jsonwebtoken')

module.exports.checkAccessToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return
    }
    try {
        const user = await jwt.verify(token, process.env.JSON_WEB_TOKEN);
        console.log(user.id, "user.id");
        req.user = user;
    } catch (error) {

    }
    next();

}