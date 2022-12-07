let PostSchema = require("../model/postSchema");
let UserSchema = require("../model/user");
let ChatSchema = require("../model/chat");
let MyError = require("../utils/myError");
let asyncHandler = require("../middleware/asyncHandler");
let path = require("path");
let fs = require("fs");
let {getPostNotIncludedUser,getPostNotIncludedUserAndLimitandSkip,getAllPostWithLimitandSkip} = require('../service/post')
let mongoose = require("mongoose");
let { isOwner } = require('../service/user')
exports.getPosts = asyncHandler(async (req, res, next) => {
  let posts;
  let { school, group, subject } = req.query;
  let limit = parseInt(req.query.limit) || 5;
  let page = parseInt(req.query.page);
  let total = await PostSchema.countDocuments();
  let pageCount = Math.ceil(total / limit);
  let start = (page - 1) * limit + 1;
  let end = start + limit - 1;


  if (end > total) end = total;
  let pagination = { page, total, pageCount, start, end };
  if (page < pageCount) pagination.nextPage = page + 1;
  if (page > 1) pagination.prevPage = page - 1;


if(school!==""&&subject!==""&&group!==""){
  if (req.headers.userid) {
    pagination.pageCount = Math.ceil(
      (await getPostNotIncludedUser(req.headers.userid)).length / limit
    );

    posts = await PostSchema.find({ owner: { $ne: req.headers.userid },isDone:false,subject:subject,school:school,group:group })
    .limit(limit)
    .skip(start - 1).populate('owner');

    pagination.total = posts.length;
  } else {
    console.log('kkk2')
    posts = await PostSchema.find({isDone:false,subject:subject,school:school,group:group})
    .limit(limit)
    .skip(start - 1).populate('owner');
  }
}else{
  posts = await PostSchema.find({isDone:false})
  .limit(limit)
  .skip(start - 1).populate('owner');
}



  
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
  let posts = await PostSchema.findById(req.params.id);
   if (!posts) {
     throw new MyError("not found", 400);
   }
  if (posts.owner.toString() === req.user.id) {
  await PostSchema.findByIdAndDelete(req.params.id)
}
 
  res.status(200).json({
    success: true,
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


  let post = await PostSchema.findById((req.params.id));
  let postOwner = await UserSchema.findById(post.owner);
  let requestedPerson = await UserSchema.findById(req.user.id);
  let postOwnerChatRooms = postOwner.chatRooms;
  let requestedPersonChatRooms = requestedPerson.chatRooms;

  //huselt yvuulsan hereglegc omno ni huselt yvuulsan esehiig shalgaj baina
  let isExistInPendingRequest = post.pendingRequest.findIndex(
    (req1) => req1.id === req.user.id
  );
  if (isExistInPendingRequest === -1 || post.pendingRequest.length === 0) {
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
      data: "Та энэ заранд хүсэлт илгээсэн байна.",
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
          post.worker.chatRoomName = request.chatRoomName
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

exports.cancelWorkRequest = asyncHandler(async (req, res, next) => {
  let post = await PostSchema.findById(req.params.id);
  post.worker.id = "";
  post.worker.email = "",
    post.worker.averageRating = 0;
  post.isDone = false;
  post.save();
  res.status(200).json({
    data: post
  })
});


exports.rateWorkerPerformance = asyncHandler(async (req, res, next) => {
  const { rating } = req.body
  const post = await PostSchema.findById(req.params.id)
  const IsOwner = await isOwner(req.params.id, req.user.id);
  if (IsOwner) {
    post.worker.averageRating = rating;
    post.isDone = true;
    post.save();
    res.status(200).json({
      success: true
    })
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
            subject: { ...Posts[i] }._doc.subject,
            advertisingHeader: { ...Posts[i] }._doc.advertisingHeader,
            isDone: { ...Posts[i] }._doc.isDone,
            photo: { ...Posts[i] }._doc.photo,
            price: { ...Posts[i] }._doc.price,
            detail: { ...Posts[i] }._doc.detail,
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
