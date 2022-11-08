const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPost,
  deletePost,
  updatePost,
  createPost,
  uploadPhoto,
  getPostPhoto,
} = require("../controller/post");
router.get("/photo/:photoname", getPostPhoto);

router.get("/", getPosts).post("/", createPost);

router.get("/:id", getPost).delete("/:id", deletePost).put("/:id", updatePost)
router.put("/:id/photo", uploadPhoto);

module.exports = router;