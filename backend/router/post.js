const express = require("express");
const router = express.Router();
const {checkAccessToken} = require('../middleware/checkAccessToken')
const {
  getPosts,
  getPost,
  deletePost,
  updatePost,
  createPost,
  getPostPhoto,
} = require("../controller/post");
router.get("/photo/:photoname", getPostPhoto);

router.get("/", getPosts).post("/", createPost);

router.get("/:id", getPost).delete("/:id", deletePost).put("/:id", updatePost)


module.exports = router;