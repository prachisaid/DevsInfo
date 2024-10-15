const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { u_name, u_password } = req.body;
    const user = await userModel.findOne({ u_name, u_password });
    if (user) {
      const uid = user._id.toString();

      // generate JWT token
      const token = jwt.sign({ uid }, "devsinfo", { expiresIn: "1d" });
      return res
        .status(200)
        .json({ success: true, token: `Bearer ${token}`, u_name, uid });
    } else
      return res.status(200).json({
        success: false,
        message: `Please check your username or password`,
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const { u_name, u_password } = req.body;
    const user = await userModel.findOne({ u_name });

    if (user) {
      return res.status(200).json({
        success: false,
        message: `User with ${u_name} already exists`,
      });
    }

    const data = await userModel.create({ u_name, u_password });
    if (data) {
      return res
        .status(200)
        .json({ success: true, message: "Signup successfull" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Some error occured" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
};

