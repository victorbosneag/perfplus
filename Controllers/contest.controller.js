import db from "../Models/index.js";
import blankBody from "../Utils/blankBody.util.js";
import { paginate } from "../Utils/paginate.util.js";
import typeField from "../Utils/typeField.util.js";
import url from "url";
const Contest = db.contests;
const Participant = db.participants;

export const createContest = async (req, res) => {
  blankBody(req, res);
  //console.log(!req.body);
  const signedin = res.locals.user;
  const contestInfo = req.body;
  try {
    const createdContest = await Contest.create({
      contestName: contestInfo.contestName,
      subject: contestInfo.subject,
      year: contestInfo.year,
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
  
  try{
    const pageInfo = await paginate(Contest, nrPage, nrItems, PAGEMAXSIZE);
    res.status(200).send(pageInfo)
  }
  catch(err){
    res.status(500).send("findContestFail");
  }
};

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
