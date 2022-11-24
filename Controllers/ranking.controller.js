import url from "url";
import db from "../Models/index.js";
import blankBody from "../Utils/blankBody.util.js";
import typeField from "../Utils/typeField.util.js";


const Participant = db.participants;
const Ranking = db.rankings;

export const createRanking = (req, res) => {
    blankBody(req, res);
    const rankings = req.body.rankings;
    //format check
    typeField(rankings,'object',res);
    //find the contest specified

    //create arrays in which results of bulk create will be stored
    let errorBuffer = [];
    let createdBuffer = [];
    let existingBuffer = [];
    let invalidBuffer = [];
    let cnt=0;
    const callback = () => {
        res.status(200);
        res.send({
            errors: errorBuffer,
            created: createdBuffer,
            existing: existingBuffer,
            invalid: invalidBuffer
        })
    }
    //bulk create using findOrCreate to avoid adding duplicates
    rankings.forEach(async (ranking, index, object) => {
        let cat = false;
        //testing to see if valid hs was provided
        try{
            var foundParticipant = await Participant.findOne({
                where: {
                    name: ranking.participantId
                }
            });
            
            if(foundParticipant == null){
                
                invalidBuffer.push(ranking);
                cat = true;
            }
            
        }
        catch(err){
            errorBuffer.push(ranking);
            cat = true;
        }
        //delete participant id to allow for seemless appending to db
        delete ranking.participantId;
        //if not already processed
        if(!cat)
        {
            
            const [rankingEntry, created] = await Ranking.findOrCreate({
                where: ranking,
            })
            
            
            try{
                if(!created){
                    
                    existingBuffer.push(ranking);
                }
                else{
                    foundParticipant.addRanking(rankingEntry);
                    createdBuffer.push(ranking);
                    
                }
            }
            catch(err)
            {   
                errorBuffer.push(ranking);
                console.log(err);
            }
        }
        cnt = cnt + 1;
        if(cnt === rankings.length){
            callback();
        }
        
        
    });
}
/*
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

*/