import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import contestRouter from "./Routes/contest.routes.js";
import participantRouter from "./Routes/participant.routes.js";
import rankingRouter from "./Routes/ranking.routes.js";
import postRouter from "./Routes/post.routes.js";
import userRouter from "./Routes/user.routes.js";
import contestContentRouter from "./Routes/contestContent.routes.js";
const app = express();
dotenv.config({ path: "./config.env" });

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json({limit: '40mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api/contest", contestRouter);
app.use("/api/participant", participantRouter);
app.use("/api/ranking", rankingRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);
app.use("/api/contestcontent", contestContentRouter);

import db from "./Models/index.js";
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const PORT = 5000;
app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
