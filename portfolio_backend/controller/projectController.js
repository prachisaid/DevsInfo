const projectsModel = require("../models/projectsModel");
const cloudinary = require("cloudinary").v2;

exports.getAllProjectsById = async (req, res) => {
  try {
    const uid = req.params.id;
    const data = await projectsModel.find({ uid });
    if (data) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ succss: false, data: null });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { uid, pid } = req.params;
    const data = await projectsModel.findOne({ _id: pid, uid: uid });
    if (data) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ succss: false, data: null });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

exports.getAllProjectsByUserId = async (req, res) => {
  try {
    const uid = req.params.id;
    const data = await projectsModel.find({ uid });
    if (data) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ success: false, data: null });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

exports.getAllProjectsPagination = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    let limitCount = 12;
    let skipCount = (page - 1) * limitCount;

    const result = await projectsModel.find().limit(limitCount).skip(skipCount);

    const allProjects = await projectsModel.find();
    const totalLength = allProjects.length;
    const count = Math.ceil(totalLength / limitCount);

    if (result) {
      return res.status(200).json({
        success: true,
        data: result,
        pageCount: count == 0 ? 1 : count,
      });
    } else {
      return res.status(400).json({
        success: false,
        data: null,
        pageCount: 0,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
};

exports.updateProjectById = async (req, res) => {
  try {
    const {
      uid,
      pid,
      project_name,
      project_domain,
      tagline,
      github_repo,
      project_url,
      description,
    } = req.body;

    // validate if all fields are not empty
    if (
      [
        uid,
        pid,
        project_name,
        project_domain,
        tagline,
        github_repo,
        project_url,
        description,
      ].includes("")
    ) {
      return res
        .status(200)
        .json({ success: false, message: "Please fill all fields" });
    }

    const data = await projectsModel.findOneAndUpdate(
      { _id: pid, uid: uid },
      {
        $set: {
          project_name: project_name.toLowerCase(),
          project_domain: project_domain.toLowerCase(),
          tagline,
          github_repo,
          project_url,
          description,
        },
      }
    );

    if (data) {
      return res
        .status(200)
        .json({ success: true, message: "Data updated successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Data not updated successfully" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
};

exports.addProject = async (req, res) => {
  try {
    if (!req.files) {
      res
        .status(400)
        .json({ success: false, message: "Please select a file first" });
      console.log("file not received");
      return;
    }
    const file = req.files.image;
    const allowedSize = 2 * 1024 * 1024 * 1024 * 1024 * 1025; // 5MB

    if (file.size > allowedSize) {
      res.status(400).json({ success: false, message: "Max 5MB allowed" });
    }

    const {
      uid,
      project_name,
      project_domain,
      tagline,
      github_repo,
      project_url,
      description,
      u_name,
    } = req.body;
    console.log(u_name);
    // validate if all fields are not empty
    if (
      [
        uid,
        project_name,
        project_domain,
        tagline,
        github_repo,
        project_url,
        description,
      ].includes("")
    ) {
      return res
        .status(200)
        .json({ success: false, message: "Please fill all fields" });
    }

    // save data into db

    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      if (!err) {
        const data = await projectsModel.create({
          uid,
          project_name: project_name.toLowerCase(),
          project_domain: project_domain.toLowerCase(),
          tagline,
          github_repo,
          project_url,
          description,
          image: result.url,
          u_name
        });
        if (data) {
          return res
            .status(200)
            .json({ success: true, message: "Data updated successfully" });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Data not updated successfully" });
        }
      } else {
        return res
          .status(400)
          .json({
            success: false,
            message: "Data not updated successfully file upload error",
          });
      }
    });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

exports.updateProjectLike = async (req, res) => {
  try {
    const pid = req.params.pid;

    const likeData = await projectsModel.findOne({ _id: pid });
    let likeCount = parseInt(likeData.like);

    const result = await projectsModel.findOneAndUpdate(
      { _id: pid },
      { like: likeCount + 1 }
    );
    if (result) {
      return res.status(200).json({ message: "Liked", success: true });
    } else {
      return res
        .status(400)
        .json({ message: "Some error occured while liking", success: false });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

exports.deleteProjectById = async (req, res) => {
  try {
    const pid = req.params.pid;
    const result = await projectsModel.deleteOne({ _id: pid });
    if (result) {
      return res
        .status(200)
        .json({ message: "Project deleted", success: true });
    } else {
      return res
        .status(400)
        .json({ message: "Project not deleted", success: false });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
};

exports.searchAllProjectsPagination = async (req, res) => {
  try {
    const { project_name, project_domain } = req.body;

    const result = await projectsModel.find({
      $and: [
        { project_name: { $regex: `${project_name.toLowerCase()}` } },
        { project_domain: { $regex: `${project_domain.toLowerCase()}` } },
      ],
    });

    if (result) {
      return res.status(200).json({
        success: true,
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
};
