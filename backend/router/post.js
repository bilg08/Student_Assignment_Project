const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPost,
  deletePost,
  updatePost,
  createPost,
} = require("../controller/post");

router.get("/", getPosts).post("/", createPost);

router.get("/:id", getPost).delete("/:id", deletePost).put("/:id", updatePost);

module.exports = router;
