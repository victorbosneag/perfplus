import { createContest, listContest } from "./Controllers/contest.controller.js";

import db from "./Models/index.js"
/*
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
    createContest({
        contestName: "test1",
        subject: "math",
        year: 1984
    })
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


*/
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
    listContest({search: undefined});
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
