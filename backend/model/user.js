const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "НЭРЭЭ ОРУУЛНА УУ"],
  },
  averageRating: {
    type: Number,
    required: true,
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
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getJsonWebToken = function () {
  const token = jwt.sign(
    { id: this._id },
    process.env.JSON_WEB_TOKEN,
    { expiresIn: '1d' }
  );
  return token

}
module.exports = mongoose.model('User', UserSchema)
