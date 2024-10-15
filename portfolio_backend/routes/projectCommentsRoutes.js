const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");
const commentsController = require("../controller/commentsController");

router.get(
  "/getprojectcommentsbyid/:pid",
  protect,
  commentsController.getProjectCommentsById
);

router.post(
  "/addprojectcomment/:pid",
  protect,
  commentsController.addProjectComment
);

module.exports = router;
