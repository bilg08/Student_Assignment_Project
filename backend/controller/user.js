const UserSchema = require("../model/user");
const PostSchema = require("../model/postSchema");
const bcrypt = require("bcrypt");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const jwt = require("jsonwebtoken");

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({ email }).select('+password');
  const ok = await user.checkPassword(password);
  if (!ok) {
    res.status(400).json({
      success: false,
      data:'Нэр нууц үг буруу байна'
  })
  }else{
    res.status(200).json({
      success: true,
      token: user.getJsonWebToken(),
      user
  })
  }
});

exports.createUser = async (req, res) => {
  try {
    const user = await UserSchema.create(req.body);
    const token = user.getJsonWebToken();

    res.status(200).json({
      data: user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
exports.getUserInfo = async (req, res) => {
  const user = await UserSchema.findById(req.user.id);
  console.log();

  res.status(200).json({
    data: user,
  });
};
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await PostSchema.find({ owner: req.user.id });

    res.status(200).json({
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
exports.PostsUserHaveToDo = async (req, res) => {
  const user = await UserSchema.findById(req.users.id);
};

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await UserSchema.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });


  if (!user) {
    throw new MyError("not found", 400);
  }
});