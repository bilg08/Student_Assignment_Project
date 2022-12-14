const PostSchema = require("../model/postSchema");
exports.getPostNotIncludedUser = async (id) => {
  return await PostSchema.find({ owner: { $ne: id },isDone:false }).populate('owner');
};
exports.getPostNotIncludedUserLength = async () => {
  return await PostSchema.find({ owner: { $ne: id } }).length;
};
exports.getPostNotIncludedUserAndLimitandSkip = async (id, limit, start) => {
  return await PostSchema.find({ owner: { $ne: id },isDone:false })
    .limit(limit)
    .skip(start - 1).populate('owner');
};

exports.getAllPostWithLimitandSkip = async (limit, start) => {
  return await PostSchema.find({isDone:false})
    .limit(limit)
    .skip(start - 1).populate('owner');
};
exports.moveImageToImagesFolder = async (path) => {
  try {
    file.mv(path, (err) => {
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
  } catch (error) {
  }
};