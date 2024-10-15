const express = require("express");
const router = express.Router();

// auth
const protect = require("../middleware/auth");

// controller
const followController = require("../controller/followController");

router.get("/getallusers/:id/:page", protect, followController.getAllUsers);
router.get("/getfollowers/:id", protect, followController.getFollowers);
router.get("/getfollowing/:id", protect, followController.getFollowing);

router.post("/follow", protect, followController.addFollower);


module.exports = router;
