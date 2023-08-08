require("dotenv").config();
const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const express = require("express");
const app = express();
const videos = require("./routes/videos");
const cors = require("cors");

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

app.use(express.json());

app.use("/public-images", express.static("./public/images"));

app.get("/", (req, res) => {
  res.send("Hey, Your server is running.");
});

app.use("/videos", videos);

app.listen(PORT, () => {
  console.log("Server in running on PORT " + PORT);
});
