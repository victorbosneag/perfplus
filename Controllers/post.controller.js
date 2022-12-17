import url from "url";
import db from "../Models/index.js";
import blankBody from "../Utils/blankBody.util.js";
import typeField from "../Utils/typeField.util.js";
import { paginate } from "../Utils/paginate.util.js";
import PostTool from "../Utils/postTool.util.js";

const Contest = db.contests;
const Post = db.posts;
const postContent = new PostTool("/home/victor/Documents/Informatica/perfplus/Public/Posts");

export const createPost = async (req, res) => {
  blankBody(req, res);
  const title = req.body.title;
  const type = req.body.type;
  const body = req.body.body;
  const contest = req.body.contest;
  //format check
  console.log(typeof title);
  console.log(typeof type);
  console.log(typeof body);
  console.log(typeof contest);

  if(
    typeField(title, "string", res) *
    typeField(type, "string", res) *
    typeField(body, "string", res) *
    typeField(contest, "string", res)
    === 0
  )
  {
    return;
  }
  //find the contest specified
  try {
    var contestData = await Contest.findOne({
      where: {
        contestName: contest,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("postAddFail");
  }
  
  if (!contestData){
    return res.status(400).send("invalidContest");
  }
  console.log(contestData);
  try{

    var createdPost = await Post.create({
        title: title,
        type: type
    });
    createdPost.setContest(contestData);
  }
  catch(err){
    return res.status(400).send("postAddFail");
  }
  try{
    const resp = await postContent.create(createdPost.id, title, type, body);
    console.log(resp);
    if(resp){
        res.status(200).send("Success");
    }
    else{
        Post.destroy({
            where: { id: createdPost.id }
        });
        res.status(500).send("postAddAbort");
    }
  }
  catch(err){
    Post.destroy({
        where: { id: createdPost.id }
    });
    return res.status(500).send("postAddAbort");

  }
  
};

export const findPost = async (req,res)=>{
  blankBody(req, res);
  const id = req.body.id;
  try{
    var foundPost = await Post.findOne({
      where: { id: id }
    });
    if(!foundPost){
      return res.status(404).send("postNotFound")
    }
  }
  catch(err){
    res.status(404).send("postNotFound");
  }
  if(foundPost){
    try{
      const resp = await postContent.find(id);
      res.status(200).send(resp);
    }
    catch(err){
     
      Post.destroy({
        where: { id: id }
      });
      return res.status(404).send("postContentNotFound")
    
    
    }
  }

}