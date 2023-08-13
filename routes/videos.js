const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");

function readVideosFile() {
  const videoList = fs.readFileSync(`./data/videos.json`);
  const parsedData = JSON.parse(videoList);
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
    channel: "Ivan Salgado",
    image: "http://localhost:8080/public-images/Upload-video-preview.jpg",
    views: "9,999,999",
    likes: "999,999",
    duration: "4:20",
    timestamp: 1632344461000,
    comments: [
      {
        id: "2d818087-c1f4-4ec2-bcdc-b545fd6ec258",
        name: "Ivan Salgado",
        comment: "Ivan filling up the comments",
        likes: 999,
        timestamp: 1632512763000,
      },
    ],
  };

  const videos = readVideosFile();
  videos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
  res.status(201).json(newVideo);
});

module.exports = router;
