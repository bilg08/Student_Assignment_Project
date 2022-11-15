const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({
  owner: {
    type:{
      email:""
    },
    required: true,
  },
  message: {
    type: String,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ChatSchema