const express = require("express");
const router = express.Router();
const { checkAccessToken } = require('../middleware/checkAccessToken')
const {
  getPosts,
  getPost,
  deletePost,
  updatePost,
  createPost,
  getPostPhoto,
  createPostPhoto,
} = require("../controller/post");
router.route("/photo/:photoname").get(getPostPhoto);

router.get("/", getPosts)
router.route("/").post(checkAccessToken, createPost);
router.route("/:id/photo").post(checkAccessToken, createPostPhoto);

router.get("/:id", getPost).delete("/:id", deletePost).put("/:id", updatePost)


module.exports = router;