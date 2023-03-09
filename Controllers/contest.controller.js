import db from "../Models/index.js";
import blankBody from "../Utils/blankBody.util.js";
import { paginate } from "../Utils/paginate.util.js";
import typeField from "../Utils/typeField.util.js";
import url from "url";
const Contest = db.contests;
const Participant = db.participants;
const User = db.users;
const mapUser = (rowData) => {
  const newRowPromise = rowData.map(async (row) => {
    const rowDataValue = row.dataValues;
    const user = await User.findOne({
      where: { id: rowDataValue["userid"] },
    });
    rowDataValue["username"] = user.username;
    return rowDataValue;
  });
  return Promise.all(newRowPromise)
};

export const createContest = async (req, res) => {
  blankBody(req, res);
  //console.log(!req.body);
  const signedin = res.locals.user;
  const contestInfo = req.body;
  try {
    const convertedDate = new Date(contestInfo.date);
    const createdContest = await Contest.create({
      contestName: contestInfo.contestName,
      subject: contestInfo.subject,
      date: convertedDate,
    });
    createdContest.setUser(signedin);
    res.status(200).send(createdContest);
  } catch (err) {
    console.log(err);
    res.status(500).send("addContestFailed");
  }
};

export const listContest = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const nrItems = queryObject.nrItems;
  const nrPage = queryObject.nrPage;
  const PAGEMAXSIZE = 100;
  console.log(nrItems);
  console.log(nrPage);

  try {
    const pageInfo = await paginate(
      Contest,
      nrPage,
      nrItems,
      PAGEMAXSIZE,
      undefined,
      undefined,
      mapUser
    );
    res.status(200).send(pageInfo);
  } catch (err) {
    res.status(500).send("findContestFail");
  }
};

export const getContest = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  try {
    const contests = await Contest.findAll();
    res.status(200).send(contests);
  } catch (err) {
    res.status(500).send("findContestFail");
  }
};

export const findContest = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const contestId = queryObject.id;
  try {
    const contests = await Contest.findAll({
      where: {id: contestId},
    });
    const contestsUser = await mapUser(contests)
    res.status(200).send(contestsUser[0]);
  } catch (err) {
    res.status(500).send("findContestFail");
  }
}

export const deleteContest = (req, res) => {
  if (!blankBody(req, res)) {
    return;
  }
  const contest = req.body.contestName;
  if (!typeField(contest, "string", res)) {
    return;
  }
  Contest.destroy({
    where: {
      contestName: contest,
    },
  })
    .then((data) => {
      console.log(data);
      res.status(200).send("Success");
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
};
