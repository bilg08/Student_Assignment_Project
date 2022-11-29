const UserSchema = require("../model/user");
const PostSchema = require("../model/postSchema");
const bcrypt = require("bcrypt");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const jwt = require("jsonwebtoken");
const path = require('path')
const fs = require('fs')

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
      token,
      data: user
    });
  }
});

exports.createUser = async (req, res) => {
  try {
    const user = await UserSchema.create(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = user.getJsonWebToken();
    user.save()
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
  let user = await UserSchema.findById(req.user.id);
  const worksByCategoriesAvg = await PostSchema.aggregate([
    { $match: { "worker.id": req.user.id } },
    { $match: { isDone: true } },
    { $group: { _id: "$group", avg: { $avg: "$worker.averageRating" }, sum: { $sum: 1 } } },
  ]);

  async function computeAverageRating() {
    let data = 0
    const userWorkedPost = await PostSchema.aggregate([
      { $match: { "worker.id": req.user.id } },
      { $match: { isDone: true } },
    ]);
    userWorkedPost.map((el) => {
      data += el.worker.averageRating;
    });
    return (parseInt(data / userWorkedPost.length))
  }

  if (worksByCategoriesAvg.length > 0) {
    let avgRating = await computeAverageRating();
    user.averageRating = avgRating
    user.averageRatingByGroupByGroup = worksByCategoriesAvg;
    user.save();
    res.status(200).json({
      data: user,
    });

  } else {
    res.status(200).json({
      data: await UserSchema.findById(req.user.id),
    });
  }

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
  let file = req.files.file;
  file.name = `photo_${req.user.id}${path.parse(file.name).ext}`;
  file.mv(`./images/users/${file.name}`, (err) => {
    if (err) {
      res.status(400).json({
        error: "aldaa garlaa",
      });
    }
  });

  const user = await UserSchema.findByIdAndUpdate(req.user.id, { ...req.body, photo: file.name });
  user.save()

  res.status(200).json({
    success: true
  })
});

exports.getUserProfilePhoto = asyncHandler(async (req, res, next) => {
  fs.readFile(`./images/users/photo_${req.params.id}.png`, (err, data) => {
    if (err) {
      res.status(400).json({
        error: "aldaa garlaa",
      });
    }
    res.end(data)
  });


});