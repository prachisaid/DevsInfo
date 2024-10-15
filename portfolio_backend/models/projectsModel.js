const mongoose = require("mongoose");

const project = mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  project_name: {
    type: String,
    required: [true, "Please enter project name"]
  },
  project_domain: {
    type: String,
    default: "",
  },
  tagline: {
    type: String,
    default: "",
  },
  like: {
    type: Number, 
    default: 0,
  },
  image: {
    type: String, 
    default: "",
  },
  github_repo: {
    type: String,
    default: "https://github.com"
  },
  project_url: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
    maxLength: [500, "Only 500 Characters are allowed"],
  },
  u_name:{
    type:String,
    default: "",
  }
});

module.exports = mongoose.model("projectModel", project);
