const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      data: "Not authorized to access this route",
    });
  }

  try {
    const verify = jwt.verify(token, "devsinfo");

    req.user = await User.findOne({ _id: verify.uid });

    // check if user is null
    if (req.user === null) {
      return res.status(401).json({
        success: false,
        data: "Not authorized to access this route",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      data: "Not authorized to access this route",
    });
  }
};

module.exports = protect;
