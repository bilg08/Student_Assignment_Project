const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: [true, "НЭРЭЭ ОРУУЛНА УУ"],
  },
  LastName: {
    type: String,
    required: [true, "ОВГОО ОРУУЛНА УУ"],
  },
  School: {
    type: String,
    required: [true, "СУРГУУЛИА ОРУУЛНА УУ"],
  },
  photo: {
    type: String,
    required: [true],
    default: "no-photo.jpeg"
  },
  level: {
    type: Number,
    required: [true, "ТҮВШНЭЭ ОРУУЛНА УУ"]
  },
  averageRating: {
    type: Number,
    required: true,
    default: 0
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
  chatRooms: {
    type: [String],
    required:true,
    default:[]
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
    { id: this._id,email:this.email },
    process.env.JSON_WEB_TOKEN,
    { expiresIn: '1d' }
  );
  return token

}
module.exports = mongoose.model('User', UserSchema)
