const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");

function readVideosFile() {
  const VideoList = fs.readFileSync(`./data/videos.json`);
  const parsedData = JSON.parse(VideoList);
  return parsedData;
}

router.get("/", (req, res) => {
  const videos = readVideosFile();
  let result = videos.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  res.send(result);
});

router.get("/:videoId", (req, res) => {
  const videos = readVideosFile();
  const specificVideo = videos.find((video) => video.id === req.params.videoId);
  res.json(specificVideo);
});

router.post("/", (req, res) => {
  const newVideo = {
    id: crypto.randomUUID(),
    title: req.body.title,
    description: req.body.description,
  };

  const videos = readVideosFile();
  videos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
  res.status(201).json(newVideo);
});

module.exports = router;
