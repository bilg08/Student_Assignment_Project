const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPost,
  deletePost,
  updatePost,
  createPost,
  uploadPhoto,
} = require("../controller/post");

router.get("/", getPosts).post("/", createPost).put(uploadPhoto);

router.get("/:id", getPost).delete("/:id", deletePost).put("/:id", updatePost);

module.exports = router;
