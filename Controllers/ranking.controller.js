import url from "url";
import db from "../Models/index.js";
import blankBody from "../Utils/blankBody.util.js";
import typeField from "../Utils/typeField.util.js";


const Participant = db.participants;
const Ranking = db.rankings;

export const createRanking = async (req, res) => {
    blankBody(req, res);
    const rankings = req.body.rankings;
    //format check
    typeField(rankings,'object',res);
    
    //create arrays in which results of bulk create will be stored
    let errorBuffer = [];
    let createdBuffer = [];
    let skippedBuffer = [];
    let invalidBuffer = [];
    
    //bulk create using findOrCreate to avoid adding duplicates
    for(let i=0; i<rankings.length; i++){
        const ranking = rankings[i];
        let cat = false;
        //testing to see if valid hs was provided
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
            console.log(err);
            cat = true;
        }
        
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
                    createdBuffer.push(ranking);
                    
                }
            }
            catch(err)
            {   
                errorBuffer.push(ranking);
                console.log(err);
            }
        }
        
        
    }
    //send op result
    res.status(200);
    res.send({
        errors: errorBuffer,
        created: createdBuffer,
        skipped: skippedBuffer,
        invalid: invalidBuffer
    })
    
}