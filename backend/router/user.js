const express = require('express')
const router = express.Router();
const {createUser, login} = require('../controller/user')
const {checkAccessToken} = require('../middleware/checkAccessToken')
router.post("/register", createUser);
router.post('/login',login)

module.exports = router;