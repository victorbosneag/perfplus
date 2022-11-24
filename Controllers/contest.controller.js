import db from "../Models/index.js";
import blankBody from "../Utils/blankBody.util.js";
import typeField from "../Utils/typeField.util.js";
const Contest = db.contests;
const Participant = db.participants;


export const createContest = (req, res) => {
    blankBody(req, res);
    //console.log(!req.body);
    const contestInfo = req.body;
    Contest.create({
        contestName: contestInfo.contestName,
        subject: contestInfo.subject,
        year: contestInfo.year
    })
    .then(data => {
        console.log(data.dataValues);
        res.send(data.dataValues);
        
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    })
        
};


export const listContest = (req, res) => {
    Contest.findAll({
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.send(err);
    })
}



export const deleteContest = (req, res) => {
    blankBody(req, res);
    const contest = req.body.contestName;
    typeField(contest, 'string', res);
    Contest.destroy({
        where: {
            contestName: contest
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400);
        res.send(err);
    })
}

