const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  subject: {
    type: String,
    required: [true, "Хичээлийн сэдвээ оруулна уу"],
  },
  advertisingHeader: {
    type: String,
    required: [true, "Зарын гарчгийг оруулна уу"],
    maxLength: [50, "НЭРНЫ УРТ ИХ БАЙНА"],
  },
  photo: {
    type: String,
    required: [true],
    default: "no-photo.jpeg"
  },
  worker:{
   type:mongoose.Schema.ObjectId,
  },
  pendingRequest: {
    type: Array,
    required: true,
    default: []
  },
  price: {
    type: String,
    required: [true, "Үнийг оруулна уу"],
    default: "Үнэ тохирно"
  },
  detail: {
    type: String,
    required: [true, "Дэлгэрэнгүй хэсгийг оруулна уу"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("post", PostSchema);
