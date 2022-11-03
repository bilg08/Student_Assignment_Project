const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "НЭРЭЭ ОРУУЛНА УУ"],
  },
  email: {
    type: String,
    required: [true, "Емайлаа ОРУУЛНА УУ"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Та зөв емайл оруулна уу",
    ],
  },
  password: {
    type: String,
    minLength: 4,
    required: [true, "НУУЦ ҮГ ОРУУЛНА УУ"],
    select: false,
  },
});

module.exports = mongoose.model('User',UserSchema)
