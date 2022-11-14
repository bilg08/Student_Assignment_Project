const express = require("express");
const router = express.Router();
const { sendChat, getChats } = require("../controller/chat");
const { checkAccessToken } = require("../middleware/checkAccessToken");
router.route("/:chatRoomName/sendMessage").post(checkAccessToken,sendChat);
router.route("/:chatRoomName/getMessages").get(checkAccessToken,getChats);

module.exports = router;
