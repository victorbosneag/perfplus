import url from "url";
import db from "../Models/index.js";
import blankBody from "../Utils/blankBody.util.js";
import typeField from "../Utils/typeField.util.js";
import { paginate } from "../Utils/paginate.util.js";
const Contest = db.contests;
const Participant = db.participants;
const Highschool = db.highschools;

export const createParticipant = async (req, res) => {
    blankBody(req, res);
    const participants = req.body.participants;
    const contest = req.body.contest;
    //format check
    typeField(contest, 'string', res);
    typeField(participants,'object',res);
    //find the contest specified
    try{
        var contestData = await Contest.findOne({
            where: {
                contestName: contest
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(400).send("participantAddFail");
    }
    console.log("Found contest");
    console.log(contestData);
    //create arrays in which results of bulk create will be stored
    let errorBuffer = [];
    let createdBuffer = [];
    let skippedBuffer = [];
    let invalidBuffer = [];
    
    //bulk create using findOrCreate to avoid adding duplicates
    for(let i=0; i<participants.length; i++){
        const participant = participants[i];
        let cat = false;
        //testing to see if valid hs was provided
        try{
            var foundHighschool = await Highschool.findOne({
                where: {
                    name: participant.highschool
                }
            });
            
            if(foundHighschool == null){
                
                invalidBuffer.push(participant);
                cat = true;
            }
            
        }
        catch(err){
            errorBuffer.push(participant);
            cat = true;
        }
        //delete highschool to allow for seemless appending to db
        delete participant.highschool;
        //if not already processed
        if(!cat)
        {
            try{
                const [participantEntry, created] = await Participant.findOrCreate({
                    where: participant,
                })
                
            
            
                if(!created){
                    
                    skippedBuffer.push(participant);
                }
                else{
                    
                    participantEntry.setContest(contestData);
                    participantEntry.setHighschool(foundHighschool);
                    createdBuffer.push(participant);
                    
                    
                   
                }
            }
            catch(err)
            {   
                errorBuffer.push(participant);
                console.log(err);
            }
        }
        //send op result
        
    }
    res.status(200);
    res.send({
        errors: errorBuffer,
        created: createdBuffer,
        skipped: skippedBuffer,
        invalid: invalidBuffer
    })
    
}

export const getParticipants = async (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const contest = queryObject.contestName;
    const highschool = queryObject.hsName;
    const nrItems = queryObject.nrItems;
    const nrPage = queryObject.nrPage;
    //console.log(req);
    const PAGEMAXSIZE = 100;
    let search = {};
    const order = [
        ["lastName", "ASC"],
        ["firstName", "ASC"]
    ]
    try{
        if(contest != null){
            const contestFound = await Contest.findOne({
                where: {
                    contestName: contest
                }
            })
            if(contestFound !== null){
                search['contestName'] = contestFound.id;
            }
        }
        if(highschool != null){
            const highschoolFound = await Highschool.findOne({
                where: {
                    name: highschool
                }
            })
            
            if(highschoolFound !== null){
                search['hsName'] = highschoolFound.id;

            }
        }
        const pageInfo = await paginate(Participant, nrPage, nrItems, PAGEMAXSIZE, search, order);
        res.status(200).send(pageInfo);

    }
    catch(err){
        console.log(err);
    }
}