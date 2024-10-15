const express = require("express");
const router = express.Router();

// auth
const protect = require("../middleware/auth");

// controllers
const projectController = require("../controller/projectController");

router.get(
  "/getallprojectsbyid/:id",
  protect,
  projectController.getAllProjectsById
);

router.get(
  "/getprojectbyid/:uid/:pid",
  protect,
  projectController.getProjectById
);

router.get(
  "/getallprojectbyid-pagination/:page",
  protect,
  projectController.getAllProjectsPagination
);

router.get(
  "/getallprojectsbyuserid/:id",
  projectController.getAllProjectsByUserId
);


router.post("/searchallprojects", protect, projectController.searchAllProjectsPagination);

router.post("/addproject", protect, projectController.addProject); // need to work on cover image section

router.put("/updateprojectbyid", protect, projectController.updateProjectById); // need to work on cover image section

router.put(
  "/updateprojectlike/:pid",
  protect,
  projectController.updateProjectLike
);

router.delete(
  "/deleteprojectbyid/:pid",
  protect,
  projectController.deleteProjectById
);

module.exports = router;
