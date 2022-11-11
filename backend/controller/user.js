const UserSchema = require("../model/user");;
const PostSchema = require("../model/postSchema");
const bcrypt = require('bcrypt')
const asyncHandler = require('../middleware/asyncHandler');
const MyError = require('../utils/myError');
const jwt = require('jsonwebtoken')
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw MyError("EMAIL NUUTS UGEE ORUULNA UU", 400);
  }
  let user = await UserSchema.findOne({ email }).select("+password");
  if (!user) {
    throw MyError("EMAIL NUUTS UG BURUU BAINA", 400);
  }
  const ok = await bcrypt.compare(password, user.password);

  if (ok) {
    const token = user.getJsonWebToken();
    res.status(200).json({
      token
    });
  }
})

exports.createUser = async (req, res) => {
  try {
    const user = await UserSchema.create(req.body);
    const token = user.getJsonWebToken();

    res.status(200).json({
      data: user,
      token
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
exports.getUserInfo = async (req, res) => {
  const user = await UserSchema.findById(req.user.id);
  res.status(200).json({
    data: user
  })
}
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await PostSchema.find({ owner: req.user.id })

    res.status(200).json({
      data: posts
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}
exports.PostsUserHaveToDo = async (req, res) => {
  const user = await UserSchema.findById(req.user.id);
};
