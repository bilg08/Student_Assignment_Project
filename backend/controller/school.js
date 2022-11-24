let PostSchema = require("../model/postSchema");
let UserSchema = require("../model/user");
let ChatSchema = require("../model/chat");
let MyError = require("../utils/myError");
let asyncHandler = require("../middleware/asyncHandler");
let path = require("path");
let fs = require("fs");
let mongoose = require("mongoose");

exports.getPosts = asyncHandler(async (req, res, next) => {
    fs.readFileSync("../data/BasicProgrammOfMUIS.json", 'utf-8', (err, data) => {
 });

  res.status(200).json({
    
  });
});
