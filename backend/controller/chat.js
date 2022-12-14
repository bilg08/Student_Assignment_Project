const ChatSchema = require('../model/chat')
const asyncHandler = require('../middleware/asyncHandler');
const mongoose  = require('mongoose');
const fs = require("fs")
exports.sendChat = asyncHandler(async (req, res, next) => {
    const chatRoomName = req.params.chatRoomName;
    const message = req.body.message;
    const file =req.files!==null&& req.files.file
    
    if(file) {
        file.mv(`./images/chat/${file.name}`, (err) => {
        });
    }
    const chatRoom = mongoose.model(chatRoomName, ChatSchema);
    chatRoom.create({
        photo:file.name,
        id: req.user.id,
        owner:{email:req.user.email},
        message:message,
    });
    res.status(200).json({
        success: true
    })
});
exports.getChatPhoto = asyncHandler(async (req, res, next) => {
    let { photoname } = req.params;
    fs.readFile(`./images/chat/${photoname}`, (err, data) => {
      if (err) {
      }
      res.setHeader("content-type", "image/png");
      res.end(data);
    });
  });
exports.getChats = asyncHandler(async (req, res, next) => {
    const chatRoomName = req.params.chatRoomName;
    const chatRoom = mongoose.model(chatRoomName, ChatSchema);
    const data = await chatRoom.find()
    res.status(200).json({
      success: true,
      data:data
  });
});