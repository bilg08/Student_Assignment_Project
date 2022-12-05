const PostSchema = require("../model/postSchema");
exports.getPostNotIncludedUser = async (id) => {
  return await PostSchema.find({ owner: { $ne: id } });
};
exports.getPostNotIncludedUserLength = async () => {
  return await PostSchema.find({ owner: { $ne: id } }).length;
};
exports.getPostNotIncludedUserAndLimitandSkip = async (id, limit, start) => {
  return await PostSchema.find({ owner: { $ne: id } })
    .limit(limit)
    .skip(start - 1);
};

exports.getAllPostWithLimitandSkip = async (limit, start) => {
  return await PostSchema.find()
    .limit(limit)
    .skip(start - 1);
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
    console.log(error);
  }
};