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
  confirmWorkRequest,
  showPostToBeDone,
} = require("../controller/post");
router.route("/photo/:photoname").get(getPostPhoto);

router.get("/", getPosts)
router.post("/",checkAccessToken,createPost);
router.route("/:id/photo").post( createPostPhoto);

router.route('/:id/work').post(checkAccessToken, addToWorkers);

router.route('/:id/confirmWorkRequest').post(checkAccessToken,confirmWorkRequest);
router.route('/postToBeDone').get(checkAccessToken,showPostToBeDone)

router
  .get("/:id", getPost)
  .delete("/:id",  deletePost)
  .put("/:id", checkAccessToken, updatePost);


module.exports = router;