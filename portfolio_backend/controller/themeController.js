const themeModel = require("../models/themeModel");
const userModel = require("../models/userModel");

exports.getAllTheme = async (req, res) => {
  try {
    const result = await themeModel.find();
    if (result) {
      return res
        .status(200)
        .json({ success: true, data: result, theme_no: req.user.u_theme });
    } else {
      return res.status(400).json({ success: false, data: null });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
};

exports.addTheme = async (req, res) => {
  try {
    let { theme_no, theme_name, theme_description } = req.body;

    // validate fields
    theme_no = Number(theme_no);
    if (!theme_no || !theme_name || !theme_description) {
      return res
        .status(400)
        .json({ success: false, message: "Some error occured" });
    }

    const data = await themeModel.findOne({ theme_no });
    if (data) {
      return res
        .status(400)
        .json({ success: false, message: "Theme number already exists" });
    }
    const result = await themeModel.create({
      theme_no,
      theme_name,
      theme_description,
    });
    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Theme added successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Theme not added" });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

exports.updateUserTheme = async (req, res) => {
  try {
    const uid = req.user._id.toString();
    const theme_no = req.body.theme_no;
    const result = await userModel.findOneAndUpdate(
      { _id: uid },
      { u_theme: theme_no }
    );
    if (result) {
      return res.status(200).json({ success: true, message: "Theme updated" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Theme not updated" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
};
