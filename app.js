import express from 'express';
import cors from 'cors';
import contestRouter from "./Routes/contest.routes.js";
import participantRouter from "./Routes/participant.routes.js";
import rankingRouter from "./Routes/ranking.routes.js";
import postRouter from "./Routes/post.routes.js";
const app = express();
/*
var corsOptions = {
  origin: "http://localhost:8081"
};
*/
//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/contest', contestRouter);
app.use('/api/participant', participantRouter);
app.use('/api/ranking', rankingRouter);
app.use("/api/post", postRouter);

import db from "./Models/index.js";
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const PORT = 5000;
app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})