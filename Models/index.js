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
import ranking from "./ranking.model.js";
import highschool from "./highschool.model.js";
db.users = user(sequelize, DataTypes);
db.contests = contest(sequelize, DataTypes);
db.rankings = ranking(sequelize, DataTypes);
db.highschools = highschool(sequelize, DataTypes);

//rankings -> contests relationship
db.contests.hasMany(db.rankings, { foreignKey: "contestName" });
db.rankings.belongsTo(db.contests, { foreignKey: "contestName" });

//rankings -> highschools relationship
db.highschools.hasMany(db.rankings, { foreignKey: "hsName" });
db.rankings.belongsTo(db.highschools, { foreignKey: "hsName" });

export default db;