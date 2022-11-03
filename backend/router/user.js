const express = require('express')
const router = express.Router();
const {getUsers,getUser,changeUser,createUser,deleteUser} = require('../controller/user')

router.get("/", getUsers).post("/", createUser);
router
  .get("/:id", getUser)
  .delete("/:id", deleteUser)
  .put("/:id", changeUser);

module.exports = router;