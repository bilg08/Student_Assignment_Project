const PostSchema = require("../model/postSchema");
const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
const path = require('path');
const fs = require('fs')
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await PostSchema.find();

  res.status(200).json({
    success: true,
    data: posts,
  });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const posts = await PostSchema.findById(req.params.id);
  if (!posts) {
    throw new MyError("not found", 400);
  }

  res.status(200).json({
    success: true,
    data: posts,
  });
});


exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.owner = req.user.id;
  console.log(req.user.id)
  const newPost = await PostSchema.create(req.body);
  res.status(200).json({
    success: true,
    data: newPost,
  });

});
exports.createPostPhoto = asyncHandler(async (req, res, next) => {
  const post = await PostSchema.findById(req.params.id);
  const file = req.files.file;
  if (!file.mimetype.startsWith('image')) {
    res.status(400).json({
      data:'ТА ЗУРАГ ОРУУЛНА УУ' ,
    });
  }
  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
  file.mv(`./images/post/${file.name}`,err => {
    if(err) {
      res.status(400).json({
        error:'aldaa garlaa'
      });
    }
    post.photo = file.name;
    post.save();
    res.status(200).json({
      data:post
    })

  })
});
exports.deletePost = asyncHandler(async (req, res, next) => {
  const posts = await PostSchema.findByIdAndDelete(req.params.id);

  if (!posts) {
    throw new MyError("not found", 400);
  }

  res.status(200).json({
    success: true,
    data: posts,
  });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  const posts = await PostSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!posts) {
    throw new MyError("not found", 400);
  }

});

exports.addToWorkers = asyncHandler(async (req, res, next) => {
  //  req.user.id post.id
  

});



exports.getPostPhoto = asyncHandler(async (req, res, next) => {
  const { photoname } = req.params;
  console.log(photoname)
  fs.readFile(`./images/post/${photoname}`, (err, data) => {
    if(err) {
      console.log(err,'err')
    }
    console.log(data)
    res.setHeader('content-type', "image/png")
    res.end(data);
  });
});
