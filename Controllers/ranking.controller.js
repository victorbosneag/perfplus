import db from "../Models/index.js";
import rankingModel from "../Models/ranking.model.js";
import blankBody from "../Utils/blankBody.util.js";
import typeField from "../Utils/typeField.util.js";

const Contest = db.contests;
const Ranking = db.rankings;
const Highschool = db.highschools;

export const createRanking = (req, res) => {
    blankBody(req, res);
    const rankings = req.body.rankings;
    const contest = req.body.contest;
    //format check
    typeField(contest, 'string', res);
    typeField(rankings,'object',res);
    //find the contest specified
    Contest.findAll({
        where: {
            contestName: contest
        }
     })
    .then(contestData => {
        contestData = contestData[0];
        console.log("Found contest");
        console.log(contestData);
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
                var foundHighschool = await Highschool.findOne({
                    where: {
                        name: ranking.highschool
                    }
                });
               
                if(foundHighschool == null){
                    
                    invalidBuffer.push(ranking);
                    cat = true;
                }
                
            }
            catch(err){
                errorBuffer.push(ranking);
                cat = true;
            }
            //delete highschool to allow for seemless appending to db
            delete ranking.highschool;
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
                        contestData.addRanking(rankingEntry);
                        foundHighschool.addRanking(rankingEntry);
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
        
    }).catch(err => {
        console.log(err);
        res.status(400);
        res.send("rankingAddFail");
    })
    
}

export const getRankings = (req, res) => {
    const contest = req.params.contestName;
    const highschool = req.params.hsName;
    const nrItems = req.params.nrItems;
    const nrPage = req.params.nrPage;
    
}