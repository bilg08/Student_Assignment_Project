const express = require("express");
const router = express.Router();
const { sendChat, getChats,getChatPhoto } = require("../controller/chat");
const { checkAccessToken } = require("../middleware/checkAccessToken");
router.route("/:chatRoomName/sendMessage").post(checkAccessToken,sendChat);
router.route("/:chatRoomName/getMessages").get(checkAccessToken,getChats);
router.route("/photo/:photoname").get(getChatPhoto);

module.exports = router;
