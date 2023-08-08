require("dotenv").config();
const { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

app.use(express.json());
app.listen(PORT, () => {
  console.log("Server in running on PORT " + PORT);
});
