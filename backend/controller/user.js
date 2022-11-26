const UserSchema = require("../model/user");
const PostSchema = require("../model/postSchema");
const bcrypt = require("bcrypt");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const jwt = require("jsonwebtoken");

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
  let user = await UserSchema.findById(req.user.id);
  
  const worksByCategoriesAvg = await PostSchema.aggregate([
    { $match: { "worker.id": req.user.id } },
    { $match: { isDone: true } },
    { $group: { _id: "$group", avg: { $avg: "$worker.averageRating" } } },
  ]);
  function computeAverageRating(worksByCategoriesAvg) {
    let data;
    for (let i = 0; i < worksByCategoriesAvg.length; i++) {
      data = + worksByCategoriesAvg[i].avg+0.1;
    };
   return parseInt(data / worksByCategoriesAvg.length);
  }
 
  if (worksByCategoriesAvg.length > 0) {
    let avgRating = computeAverageRating(
      worksByCategoriesAvg && worksByCategoriesAvg
    );
    user.averageRating = avgRating;
    user.averageRatingByGroupByGroup = worksByCategoriesAvg;
    user.save();
    console.log(user)
    // user = await UserSchema.findByIdAndUpdate(req.user.id, {
    //   averageRating: avgRating,
    // });
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
  const user = await UserSchema.findByIdAndUpdate(req.user.id, req.body.data, {
    new: true,
    runValidators: true,
  });


  if (!user) {
    throw new MyError("not found", 400);
  }
});