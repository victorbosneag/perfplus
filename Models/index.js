import dbConfig from "../Config/database.config.js";

import Sequelize from "sequelize";
import { DataTypes } from "sequelize";
import dotenv from "dotenv";
const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import user from "./user.model.js";
import contest from "./contest.model.js";
import participant from "./participant.model.js";
import highschool from "./highschool.model.js";
import post from "./post.model.js";
import contestConfig from "./contestConfig.model.js";

db.users = user(sequelize, DataTypes);
db.contests = contest(sequelize, DataTypes);
db.participants = participant(sequelize, DataTypes);
db.highschools = highschool(sequelize, DataTypes);
db.posts = post(sequelize, DataTypes);
db.contestConfigs = contestConfig(sequelize, DataTypes);

//participants -> contests relationship
db.participants.belongsTo(db.contests, { foreignKey: "contestName" });

//participants -> highschools relationship
db.participants.belongsTo(db.highschools, { foreignKey: "hsName" });

//posts -> contests relationship
db.posts.belongsTo(db.contests, { foreignKey: "contestName" });

//contests -> users
db.contests.belongsTo(db.users, { foreignKey: "userid" });

//contest config -> contests
db.contestConfigs.belongsTo(db.contests, { foreignKey: "contestName" });

export default db;
