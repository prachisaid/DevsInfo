const userModel = require("../models/userModel");
const cloudinary = require("cloudinary").v2;

exports.getUserById = async (req, res) => {
  try {
    const uid = req.params.id;
    const data = await userModel.findOne(
      { _id: uid },
      { u_password: 0, role: 0 }
    );
    if (data) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ success: false, data: null });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
};

exports.getUserByName = async (req, res) => {
  try {
    const uname = req.params.uname;
    const data = await userModel.findOne(
      { u_name: uname },
      { u_password: 0, role: 0 }
    );
    if (data) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ success: false, data: null });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
};

exports.getAccountDetailsById = async (req, res) => {
  try {
    const uid = req.params.id;
    const data = await userModel.findOne(
      { _id: uid },
      { u_name: 1, full_name: 1, u_email: 1, u_password: 1 }
    );
    if (data) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ success: false, data: null });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

exports.updatePersonalDetailsById = async (req, res) => {
  try {
    const uid = req.params.id;
    const {
      full_name,
      u_email,
      u_contact,
      u_description,
      u_company_name,
      u_work_experience,
      u_city,
      u_country,
      skillsArray,
      leetcode,
      codeforces,
      gfg,
      linkedin,
      u_resume,
    } = req.body;

    const data = await userModel.findOneAndUpdate(
      { _id: uid },
      {
        $set: {
          full_name,
          u_email,
          u_contact,
          u_description,
          u_company_name: u_company_name.toLowerCase(),
          u_work_experience,
          u_city,
          u_country,
          skills: skillsArray,
          leetcode,
          codeforces,
          gfg,
          linkedin,
          u_resume,
        },
      }
    );

    if (data) {
      return res
        .status(200)
        .json({ success: true, message: "Data updated successfully" });
    } else {
      return res.status(400).json({
        success: false,
        message: "Data not updated some error occured",
      });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

exports.updateAccountDetailsById = async (req, res) => {
  try {
    const uid = req.params.id;
    const { u_name, u_password } = req.body;

    // check if any field is empty
    if ([u_name, u_password].includes("")) {
      return res
        .status(400)
        .json({ success: false, message: "Some fields are empty" });
    }

    // check if username is already taken
    const user = await userModel.findOne({ _id: { $nin: [uid] }, u_name });
    if (user !== null) {
      return res
        .status(200)
        .json({ success: false, message: `${u_name} is already taken` });
    }

    // update user account details
    const data = await userModel.findOneAndUpdate(
      { _id: uid },
      {
        u_name,
        u_password,
      }
    );

    if (data) {
      return res
        .status(200)
        .json({ success: true, message: "Data updated successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Data not updated" });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

exports.getAllUserPagination = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    let limitCount = 12;
    let skipCount = (page - 1) * limitCount;

    const result = await userModel.find().limit(limitCount).skip(skipCount);

    const allUsers = await userModel.find();
    const totalLength = allUsers.length;
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
    return res.status(500).json({ err: e.message });
  }
};

exports.updateProfileImage = async (req, res) => {
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
    const uid = req.user._id.toString();

    if (file.size > allowedSize) {
      res.status(400).json({ success: false, message: "Max 5MB allowed" });
    }

    // save image to cloudinary and DB
    cloudinary.uploader.upload(file.tempFilePath, async (err, data) => {
      if (!err) {
        const result = await userModel.findOneAndUpdate(
          { _id: uid },
          { u_image: data.url }
        );
        if (result) {
          return res
            .status(200)
            .json({ success: true, message: "Profile Image updated" });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Profile Image not updated some database issue",
        });
      }

      // if anything goes wrong
      return res
        .status(400)
        .json({ success: false, message: "Profile Image not updated" });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
};

exports.searchAllUsers = async (req, res) => {
  try {
    const { u_name, u_company_name, uid } = req.body;

    const result = await userModel.find({
      $and: [
        { _id: { $nin: [uid] } },
        { u_name: { $regex: `${u_name}` } },
        { u_company_name: { $regex: `${u_company_name.toLowerCase()}` } },
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

exports.updateGithubUserName = async (req, res) => {
  try {
    const uid = req.params.id;
    const { user_name } = req.body;

    const result = await userModel.findOneAndUpdate(
      { _id: uid },
      { $set: { github_user_name: user_name } }
    );

    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Github username updated" });
    } else {
      return res.status(400).json({
        success: false,
        message: "Github username not updated",
      });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};
