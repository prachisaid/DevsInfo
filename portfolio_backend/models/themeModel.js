const mongoose = require("mongoose");

const themeModel = mongoose.Schema({
  theme_no: {
    type: Number,
    require: [true, "Please add theme no"]
  },
  theme_name: {
    type: String,
  },
  theme_description: {
    type: String, 
  }
});

module.exports = mongoose.model("themeModel", themeModel);
