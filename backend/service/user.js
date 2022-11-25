const UserSchema = require('../model/user')
const PostSchema = require('../model/postSchema')

exports.isOwner = async (postId, userId) => {
    let post = await PostSchema.findById(postId);
    let isOwner;
    if (post.owner.toString() === userId) {
        isOwner = true
    } else {
        isOwner = false
    }
    return isOwner

}