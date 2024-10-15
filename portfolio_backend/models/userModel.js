const mongoose = require("mongoose");

const user = mongoose.Schema({
  full_name: {
    type: String,
    default: "Enter Your Full Name",
  },
  u_name: {
    type: String,
    required: [true, "Please add your user name"],
    unique: [true, "Username already exists"],
  },
  u_email: {
    type: String,
    default: "",
  },
  u_contact: {
    type: String,
    default: "",
  },
  u_password: {
    type: String,
    required: [true, "Please add your password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  u_theme: {
    type: Number,
    default: 1
  },
  u_description: {
    type: String,
    maxLength: [100, "Only 100 Characters are allowed"],
    default: "Enter Your Description",
  },
  u_company_name: {
    type: String,
    default: "No Company",
  },
  u_work_experience: {
    type: String,
    default: "0",
  },
  u_city: {
    type: String,
    default: "Enter Your City",
  },
  u_country: {
    type: String,
    default: "Enter Your Country",
  },
  u_image: {
    type: String,
    default: "NOFILE",
  },
  u_resume: {
    type: String,
    default: "NOFILE",
  },
  skills: {
    type: [],
    default: [],
  },
  leetcode: {
    type: String,
    default: "https://leetcode.com",
  },
  codeforces: {
    type: String,
    default: "https://codeforces.com",
  },
  gfg: {
    type: String,
    default: "https://geeksforgeeks.org",
  },
  linkedin: {
    type: String,
    default: "https://linkedin.com",
  },
  github_user_name: {
    type: String, 
    default: ""
  }
});

module.exports = mongoose.model("userModel", user);