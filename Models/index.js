import dbConfig  from "../Config/database.config.js";

import Sequelize from "sequelize";
import { DataTypes } from "sequelize";
const sequelize = new Sequelize({
  
  dialect: dbConfig.dialect,
  storage: dbConfig.storage
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


import user from "./user.model.js";
import contest from "./contest.model.js";
import participant from "./participant.model.js";
import highschool from "./highschool.model.js";

db.users = user(sequelize, DataTypes);
db.contests = contest(sequelize, DataTypes);
db.participants = participant(sequelize, DataTypes);
db.highschools = highschool(sequelize, DataTypes);

//participants -> contests relationship
db.contests.hasMany(db.participants, { foreignKey: "contestName" });
db.participants.belongsTo(db.contests, { foreignKey: "contestName" });

//participants -> highschools relationship
db.highschools.hasMany(db.participants, { foreignKey: "hsName" });
db.participants.belongsTo(db.highschools, { foreignKey: "hsName" });



export default db;