const projectCommentsModel = require("../models/projectCommentsModel");

exports.addProjectComment = async (req, res) => {
  try {
    const pid = req.params.pid;
    const { u_name, comment_description } = req.body;
    const result = await projectCommentsModel.create({
      pid,
      u_name,
      comment_description,
    });
    if (result) {
      return res
        .status(200)
        .json({ message: "Data saved successfully", success: true });
    } else {
      return res.status(400).json({ message: "Data not saved", success: true });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

exports.getProjectCommentsById = async (req, res) => {
  try {
    const pid = req.params.pid;
    const result = await projectCommentsModel.find({ pid });
    if (result) {
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(400).json({ success: false, data: null });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};
