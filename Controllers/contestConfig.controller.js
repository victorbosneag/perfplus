import db from "../Models/index.js";
import blankBody from "../Utils/blankBody.util.js";
import { paginate } from "../Utils/paginate.util.js";
import typeField from "../Utils/typeField.util.js";
import url from "url";
const Contest = db.contests;
const Participant = db.participants;
const User = db.users;
const ContestConfig = db.contestConfigs;

export const getContestConfig = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const contestId = queryObject.contestId;
  try {
    const config = await ContestConfig.findOne({
      where: { contestName: contestId },
    });
    if (!config) {
      return res.status(500).send("findContestConfigFail");
    }
    res.status(200).send(config);
  } catch (err) {
    res.status(500).send("findContestConfigFail");
  }
};