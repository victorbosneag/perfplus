import db from "../Models/index.js";
import blankBody from "../Utils/blankBody.util.js";
import { paginate } from "../Utils/paginate.util.js";
import typeField from "../Utils/typeField.util.js";
import url from "url";
import formidable from "formidable";
import fs from "fs";
import base64toFile from "node-base64-to-file";
import FileManager from "../Utils/fileUpload.util.js";
const Contest = db.contests;
const Participant = db.participants;
const User = db.users;
const ContestConfig = db.contestConfigs;

const savePath = "/home/victor/Documents/Informatica/perfplus/Public/Files";
const manager = new FileManager(savePath);

const posibleTypes = ["subjects", "answers"];
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

export const parseFileUpload = async (req, res) => {
  const signedin = res.locals.user;
  const fileName = req.body.type;
  const contest = req.body.contest;
  const fileData = req.body.fileData;
  const foundContest = await Contest.findOne({
    where: { id: contest },
  });
  const foundContestConfig = await ContestConfig.findOne({
    where: { contestName: contest },
  });
  let contestSavePath = savePath;
  try {
    contestSavePath = await manager.init(contest);
  } catch (err) {
    console.log("Contest folder create error");
    return res.status(500).send("Error creating contest folder")
  }
  if (foundContest) {
    if (signedin.role === "Admin" || foundContest.userid === signedin.id) {
      base64toFile(fileData, {
        filePath: contestSavePath,
        fileName: fileName,
        fileMaxSize: 3145728,
      }).then(
        (filePath) => {
          console.log(filePath);
        },
        (error) => {
          return res.status(400).send("Error parsing file content")
        }
      );
    } else {
      return res.status(403).send("Unauthorized");
    }
  } else {
    return res.status(400).send("Contest not found");
  }

  res.send("Success");
};
