const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

// image upload configuration
cloudinary.config({
  cloud_name: "duwbwdwqc",
  api_key: "723896973772636",
  api_secret: "srE4voWKjc8uQ8MnR4BXXqDecgY",
});

const fileUpload = require("express-fileupload");
router.use(
  fileUpload({
    useTempFiles: true,
  })
);

// auth
const protect = require("../middleware/auth");

// controller
const userAuthController = require("../controller/userAuthController");
const userController = require("../controller/userController");

// auth routes
router.post("/login", userAuthController.login);
router.post("/signup", userAuthController.signup);

// user routes
router.get("/getuserbyid/:id", protect, userController.getUserById);
router.get("/getuserbyname/:uname", userController.getUserByName);

router.get(
  "/getaccountdetailsbyid/:id",
  protect,
  userController.getAccountDetailsById
);

router.get(
  "/getalluser-pagination/:page",
  protect,
  userController.getAllUserPagination
);

router.post("/searchallusers", protect, userController.searchAllUsers);

router.put(
  "/updatepersonaldetailsbyid/:id",
  protect,
  userController.updatePersonalDetailsById
);

router.put(
  "/updateaccountdetailsbyid/:id",
  protect,
  userController.updateAccountDetailsById
);

router.put("/updategithub/:id", protect, userController.updateGithubUserName);

router.put("/updateprofileimage", protect, userController.updateProfileImage);

module.exports = router;
