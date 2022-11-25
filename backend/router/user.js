const express = require('express')
const router = express.Router();
const { createUser, login, getUserPosts, getUserInfo, updateUser } = require('../controller/user')
const { checkAccessToken } = require('../middleware/checkAccessToken')
router.post("/register", createUser);
router.post('/login', login)
router.route('/posts').get(checkAccessToken, getUserPosts)
router.route('/myInfo').get(checkAccessToken, getUserInfo)
router.route('/updateMe').post(checkAccessToken, updateUser)

module.exports = router;
