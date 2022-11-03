const express = require("express");
const router = express.Router();
const {
  getAdvertisings,
  getAdvertising,
  deleteAdvertising,
  changeAdvertising,
  createAdvertising,
} = require("../controller/ad");
router.get("/", getAdvertisings).post("/", createAdvertising);
router
  .get("/:id", getAdvertising)
  .delete("/:id", deleteAdvertising)
  .put("/:id", changeAdvertising);

module.exports = router;
