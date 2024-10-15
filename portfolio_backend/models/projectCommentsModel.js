const mongoose = require("mongoose");

const projectCommentsModel = mongoose.Schema({
  pid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projectModel",
  },
  u_name: {
    type: String,
  },
  comment_description: {
    type: String,
    default: [500, "Only 500 characters are allowed"],
  },
});

module.exports = mongoose.model("projectCommentsModel", projectCommentsModel);
