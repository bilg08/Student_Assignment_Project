const mongoose = require("mongoose");
const asyncHandler = require('../middleware/asyncHandler')
const ChatSchema = new mongoose.Schema({
  owner: {
    type:{
      email:""
    },
    required: true,
  },
  photo:{
    type:String
  },
  message: {
    type: String,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
module.exports = ChatSchema
