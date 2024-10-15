const followModel = require("../models/followModel");
const userModel = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const page = parseInt(req.params.page) || 1;
    const usersData = await followModel.find({ follower_id: id });

    let usersArray = [id];
    usersData.filter((result) => {
      const user_id = result.uid.toString();
      usersArray.push(user_id);
    });

    let limitCount = 12;
    let skipCount = (page - 1) * limitCount;

    const result = await userModel
      .find({ _id: { $nin: usersArray } })
      .limit(limitCount)
      .skip(skipCount);

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

exports.getFollowers = async (req, res) => {
  try {
    const uid = req.params.id;
    const result = await followModel
      .find({ uid })
      .populate({ path: "follower_id", select: { u_password: 0, role: 0 } });

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

exports.getFollowing = async (req, res) => {
  try {
    const uid = req.params.id;
    const result = await followModel
      .find({ follower_id: uid })
      .populate({ path: "uid", select: { u_password: 0, role: 0 } });

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
    return res.status(500).json({ err: e.message });
  }
};

exports.addFollower = async (req, res) => {
  try {
    const { follower_id, uid } = req.body;

    const isFollowed = await followModel.findOne({ uid, follower_id });
    if (isFollowed) {
      return res
        .status(400)
        .json({ success: false, message: "User already followed" });
    }

    const result = await followModel.create({ uid, follower_id });
    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Started following user" });
    } else {
      return res.status(400).json({
        success: false,
        message: "User not followed some error occured",
      });
    }
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};
