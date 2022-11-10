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
  addToWorkers,
  getWorkers_Would_Like_To_Do_MyWork,
} = require("../controller/post");
router.route("/photo/:photoname").get(getPostPhoto);

router.get("/", getPosts)
router.route("/").post(checkAccessToken, createPost);
router.route("/:id/photo").post(checkAccessToken, createPostPhoto);

router.route('/:id/work').post(checkAccessToken, addToWorkers);



router
  .get("/:id", getPost)
  .delete("/:id", checkAccessToken, deletePost)
  .put("/:id", checkAccessToken, updatePost);


module.exports = router;