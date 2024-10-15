const mongoose = require("mongoose");

const followModel = mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  follower_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
});

module.exports = mongoose.model("followModel", followModel);
