const express = require("express");
const router = express.Router();

// auth
const protect = require("../middleware/auth");

// controller 
const themeController = require("../controller/themeController");

router.get("/getallthemes", protect, themeController.getAllTheme);

// add public themes to theme model
router.post("/addtheme", themeController.addTheme);

// update user themes
router.put("/updateusertheme", protect, themeController.updateUserTheme);

module.exports = router;