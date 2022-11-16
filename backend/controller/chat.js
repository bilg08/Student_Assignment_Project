const ChatSchema = require('../model/chat')
const asyncHandler = require('../middleware/asyncHandler');
const mongoose  = require('mongoose');
exports.sendChat = asyncHandler(async (req, res, next) => {
   
    const chatRoomName = req.params.chatRoomName;
    const message = req.body.message;
    const chatRoom = mongoose.model(chatRoomName, ChatSchema);
    chatRoom.create({
        id: req.user.id,
        owner:{email:req.user.email},
        message:message,
    });
    res.status(200).json({
        success: true
    })
});

exports.getChats = asyncHandler(async (req, res, next) => {
    console.log('kkasfss')
    const chatRoomName = req.params.chatRoomName;
    const chatRoom = mongoose.model(chatRoomName, ChatSchema);
    const data = await chatRoom.find()
    res.status(200).json({
      success: true,
      data:data
  });
});