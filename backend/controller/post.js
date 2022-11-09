const PostSchema = require("../model/postSchema");
const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

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
  const newPost = await PostSchema.create(req.body);
  const file = req.files.file;
  file.name = `photo_${newPost.id}${path.parse(file.name).ext}`;

  file.mv(`./images/post/${file.name}`, (err) => {
    if (err){
      console.log(err, "err");
    }
    console.log('amjilttai')
  })
  newPost.photo = file.name;
  newPost.save()
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

  // res.status(200).json({
  //   success: true,
  //   data: posts,
  // });
});
exports.getPostPhoto = asyncHandler(async (req, res, next) => {
  const { photoname } = req.params;
  console.log(photoname)
  fs.readFile(`./images/post/${photoname}.PNG`, (err, data) => {
    res.setHeader('content-type',"image/png")
    res.end(data);
  });
});

// exports.uploadPhoto = asyncHandler(async (req,res,next) => {


//   res.status(200).json({
//     success: true,
//     data: files.name,
//   });

// })