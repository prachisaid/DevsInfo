const express = require("express");
const app = express();
const cors = require("cors");

// db
require("./models/dbcon");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const projectCommentsRoutes = require("./routes/projectCommentsRoutes");
const followRoutes = require("./routes/followRoutes");
const themeRoutes = require("./routes/themeRoutes");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "hello world" });
});

// routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", projectRoutes);
app.use("/api/v1", projectCommentsRoutes);
app.use("/api/v1", followRoutes);
app.use("/api/v1", themeRoutes);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening at port ${PORT}`));
