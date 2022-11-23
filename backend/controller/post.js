const PostSchema = require("../model/postSchema");
const UserSchema = require("../model/user");
const ChatSchema = require("../model/chat");
const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

exports.getPosts = asyncHandler(async (req, res, next) => {
  const { userid } = req.headers;
  const limit = parseInt(req.query.limit) || 2;
  const page = parseInt(req.query.page) || 1;
  const total = await PostSchema.countDocuments() || 1;
  const pageCount = Math.ceil(total / limit - 1) + 1 || 1;
  let startCount = (page - 1) * limit  || 1;
  if (pageCount < page) {
    startCount = 0;
  } else if (page < 0) {
    startCount = 0;
  }
  const pagination = {
    startCount,
    limit,
    page,
    total,
    pageCount,
  };

  let posts = await PostSchema.find()
    .limit(parseInt(limit))
    .skip(startCount - 1);
  
  res.status(200).json({
    success: true,
    data: posts,
    pagination,
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

exports.createPostPhoto = asyncHandler(async (req, res, next) => {
  const post = await PostSchema.findById(req.params.id);
  const file = req.files.file;
  if (!file.mimetype.startsWith("image")) {
    res.status(400).json({
      data: "ТА ЗУРАГ ОРУУЛНА УУ",
    });
  }
  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
  file.mv(`./images/post/${file.name}`, (err) => {
    if (err) {
      res.status(400).json({
        error: "aldaa garlaa",
      });
    }
    post.photo = file.name;
    post.save();
    res.status(200).json({
      data: post,
    });
  });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  const newPost = await PostSchema.create(req.body);
  const file = req.files.file;
  file.name = `photo_${newPost.id}${path.parse(file.name).ext}`;
  file.mv(`./images/post/${file.name}`, (err) => {
    if (err) {
    }
  });
  newPost.owner = req.user.id;
  newPost.photo = file.name;
  newPost.save();
  res.status(200).json({
    success: true,
    data: newPost,
  });
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
  console.log("addToWorkers");
  const post = await PostSchema.findById(req.params.id);
  const postOwner = await UserSchema.findById(post.owner);
  const requestedPerson = await UserSchema.findById(req.user.id);
  const postOwnerChatRooms = postOwner.chatRooms;
  const requestedPersonChatRooms = requestedPerson.chatRooms;

  function isUserExistedInPendingRequest() {
    let isExist;
    post.pendingRequest.map((el) => {
      if (el.id !== req.user.id) {
        isExist = false;
        return;
      }
      isExist = true;
      return isExist;
    });
  }
  isUserExistedInPendingRequest();
  if (isUserExistedInPendingRequest() || post.pendingRequest.length === 0) {
    if (post.owner.toString() !== req.user.id) {
      const chatRoomName = `chatRoom_${req.user.id}_${post.owner.toString()}`;

      await mongoose.model(chatRoomName, ChatSchema);
      const user = await UserSchema.findById(req.user.id);
      const postPendingRequest = post.pendingRequest;
      const newPendingRequest = [
        ...postPendingRequest,
        {
          averageRating: user.averageRating,
          email: user.email,
          id: user._id,
          chatRoomName: chatRoomName,
        },
      ];
      await UserSchema.findByIdAndUpdate(req.user.id, {
        chatRooms: [...requestedPersonChatRooms, chatRoomName],
      });
      await UserSchema.findByIdAndUpdate(post.owner, {
        chatRooms: [...postOwnerChatRooms, chatRoomName],
      });
      post.pendingRequest = newPendingRequest;
      post.save();
      res.status(200).json({
        success: true,
        data: post,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      data: "ta ene zarand huselt ilgeesen baina",
    });
  }
});

exports.getPostPhoto = asyncHandler(async (req, res, next) => {
  const { photoname } = req.params;
  fs.readFile(`./images/post/${photoname}`, (err, data) => {
    if (err) {
    }
    res.setHeader("content-type", "image/png");
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
          post.save();
          res.status(200).json({
            success: true,
            data: post,
          });
        }
      });
    } else {
      res.status(400).json({
        error: `${post.worker.id} tai hund ta ene zariig ogson baina`,
      });
    }
  }
});

exports.showPostToBeDone = asyncHandler(async (req, res, next) => {
  const Posts = await PostSchema.find();
  function getPostUserInterested() {
    let data = [];
    for (let i = 0; i < Posts.length; i++) {
      for (let j = 0; j < Posts[i].pendingRequest.length; j++) {
        if (Posts[i].pendingRequest[j].email === req.user.email) {
          data.push({
            subject: Posts[i].subject,
            advertisingHeader: Posts[i].advertisingHeader,
            photo: Posts[i].photo,
            price: Posts[i].price,
            detail: Posts[i].detail,
            chatRoom: Posts[i].pendingRequest[j].chatRoomName,
          });
        }
      }
    }
    return data;
  }
  let data = getPostUserInterested();
  res.status(200).json({ data });
});
