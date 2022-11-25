let PostSchema = require("../model/postSchema");
let UserSchema = require("../model/user");
let ChatSchema = require("../model/chat");
let MyError = require("../utils/myError");
let asyncHandler = require("../middleware/asyncHandler");
let path = require("path");
let fs = require("fs");
let mongoose = require("mongoose");

exports.getPosts = asyncHandler(async (req, res, next) => {
  let {school,group,subject} = req.query;
  let limit = parseInt(req.query.limit) || 5;
  let page = parseInt(req.query.page);
  delete req.query.page
  let total = await PostSchema.countDocuments();
  let pageCount = Math.ceil(total / limit);
  let start = (page - 1) * limit + 1;
  let end = start + limit - 1;
  if (end > total) end = total;
  let pagination = { page, total, pageCount, start, end };
  if (page < pageCount) pagination.nextPage = page + 1;
  if (page > 1) pagination.prevPage = page - 1;


  let posts = await PostSchema.aggregate([{
    $match:{school,group,subject}
  }])
  .limit(limit)
  .skip(start - 1);

    
  
  res.status(200).json({
    status: false,
    data: posts,
    pagination,
  });

});

exports.getPost = asyncHandler(async (req, res, next) => {
  let posts = await PostSchema.findById(req.params.id);
  if (!posts) {
    throw new MyError("not found", 400);
  }
  res.status(200).json({
    success: true,
    data: posts,
  });
});

exports.createPostPhoto = asyncHandler(async (req, res, next) => {
  let post = await PostSchema.findById(req.params.id);
  let file = req.files.file;
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
  let newPost = await PostSchema.create(req.body);
  let file = req.files.file;
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
  let posts = await PostSchema.findByIdAndDelete(req.params.id);

  if (!posts) {
    throw new MyError("not found", 400);
  }
  res.status(200).json({
    success: true,
    data: posts,
  });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  let posts = await PostSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!posts) {
    throw new MyError("not found", 400);
  }
});

exports.addToWorkers = asyncHandler(async (req, res, next) => {
console.log(req.params)
console.log(await PostSchema.find())

  let post = await PostSchema.findById((req.params.id));
  let postOwner = await UserSchema.findById(post.owner);
  let requestedPerson = await UserSchema.findById(req.user.id);
  let postOwnerChatRooms = postOwner.chatRooms;
  let requestedPersonChatRooms = requestedPerson.chatRooms;
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
  if (isUserExistedInPendingRequest() || post.pendingRequest.length === 0) {
    if (post.owner.toString() !== req.user.id) {
      let chatRoomName = `chatRoom_${req.user.id}_${post.owner.toString()}`;

      await mongoose.model(chatRoomName, ChatSchema);
      let user = await UserSchema.findById(req.user.id);
      let postPendingRequest = post.pendingRequest;
      let newPendingRequest = [
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
  let { photoname } = req.params;
  fs.readFile(`./images/post/${photoname}`, (err, data) => {
    if (err) {
    }
    res.setHeader("content-type", "image/png");
    res.end(data);
  });
});

exports.confirmWorkRequest = asyncHandler(async (req, res, next) => {
  let post = await PostSchema.findById(req.params.id);

  if (post.owner.toString() === req.user.id) {
    if (post.worker.id === "") {
      post.pendingRequest.map(async (request) => {
        if (request.id === req.body.workerId) {
          let worker = await UserSchema.findById(req.body.workerId);
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
  let Posts = await PostSchema.find();
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
