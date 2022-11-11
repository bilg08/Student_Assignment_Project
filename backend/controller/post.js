const PostSchema = require("../model/postSchema");
const UserSchema = require("../model/user");

const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
const path = require('path');
const fs = require('fs');
const e = require("express");
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
      data: 'ТА ЗУРАГ ОРУУЛНА УУ',
    });
  }
  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
  file.mv(`./images/post/${file.name}`, err => {
    if (err) {
      res.status(400).json({
        error: 'aldaa garlaa'
      });
    }
    post.photo = file.name;
    post.save();
    res.status(200).json({
      data: post
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
  }); ``

  if (!posts) {
    throw new MyError("not found", 400);
  }

});

exports.addToWorkers = asyncHandler(async (req, res, next) => {
  const post = await PostSchema.findById(req.params.id);
  if (!post) {
    throw new MyError('iim zar baihgui', 400)
  }
  if (post.owner.toString() === req.user.id) {
    console.log(post.owner.toString(), req.user.id)
    throw new MyError('ene tanii zar baina', 400)
  }
  const postPendingRequest = post.pendingRequest;
  if (postPendingRequest.length === 0) {
    const user = await UserSchema.findById(req.user.id);
    const newPendingRequest = [...postPendingRequest, {
      averageRating: user.averageRating,
      email: user.email,
      id: user._id
    }];
    post.pendingRequest = newPendingRequest;
    post.save();
    res.status(200).json({
      success: true,
      data: post
    })
  } else if (postPendingRequest.length > 0) {
    postPendingRequest.map(async (pendingRequest) => {
      if (pendingRequest.id === req.body.workerId) {
        throw new MyError('ta ene zart huselt ilgeesen baina', 400)
      }
      const user = await UserSchema.findById(req.user.id);
      const newPendingRequest = [...postPendingRequest, {
        averageRating: user.averageRating,
        email: user.email,
        id: user._id
      }];
      post.pendingRequest = newPendingRequest;
      post.save();
      res.status(200).json({
        success: true,
        data: post
      })
    })
  }

});



exports.getPostPhoto = asyncHandler(async (req, res, next) => {
  const { photoname } = req.params;
  fs.readFile(`./images/post/${photoname}`, (err, data) => {
    if (err) {
      console.log(err, 'err')
    }
    res.setHeader('content-type', "image/png")
    res.end(data);
  });
});


exports.confirmWorkRequest = asyncHandler(async (req, res, next) => {
  const post = await PostSchema.findById(req.params.id);

  if (post.owner.toString() === req.user.id) {
    if (post.worker.id === "") {
      post.pendingRequest.map(async (request) => {
        if (request.id === req.body.workerId) {
          const worker = await UserSchema.findById(req.body.workerId);
          post.worker.averageRating = worker.averageRating;
          post.worker.id = worker.id;
          post.worker.email = worker.email;
          post.save()
          res.status(200).json({
            success: true,
            data: post
          })
        }
      })
    } else {
      res.status(400).json({
        error: `${post.worker.id} tai hund ta ene zariig ogson baina`
      })
    }

  }
});

