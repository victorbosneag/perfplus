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
    let skippedBuffer = [];
    let invalidBuffer = [];
    let cnt=0;
    const callback = () => {
        res.status(200);
        res.send({
            errors: errorBuffer,
            created: createdBuffer,
            skipped: skippedBuffer,
            invalid: invalidBuffer
        })
    }
    //bulk create using findOrCreate to avoid adding duplicates
    rankings.forEach(async (ranking, index, object) => {
        let cat = false;
        //testing to see if valid participant was provided
        try{
            var foundParticipant = await Participant.findOne({
                where: {
                    id: ranking.participantId
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
            
            try{
                const [rankingEntry, created] = await Ranking.findOrCreate({
                    where: ranking,
                })
            
            
                if(!created){
                    
                    skippedBuffer.push(ranking);
                }
                else{
                    rankingEntry.addRanking(foundParticipant);
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
