const express = require('express')
const router = express.Router();
const {createUser, login, checkJwt} = require('../controller/user')
const {checkAccessToken} = require('../middleware/checkAccessToken')
router.post("/register", createUser);
router.post('/login', login)
router.post('/checkJWT',checkJwt)

module.exports = router;