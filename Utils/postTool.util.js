import fs from 'fs';
import db from "../Models/index.js";

const Post = db.posts;

class PostTool{
    constructor(savePath){
        this.savePath = savePath
    }
    async create(id, title, type, body){
        const found = Post.findOne({
            where: { id: id }
        });
        if(found){
            try{
                const postObject = {
                    id: id,
                    title: title,
                    type: type,
                    body: body
                }
                const jsonObject = JSON.stringify(postObject);
                fs.writeFileSync(this.savePath.concat("/", id, ".json"), jsonObject);
                return true;
            }
            catch(err){
                console.log(err);
                return false;
            }
        }
        else{
            return false;
        }
    }
    async find(id){
        const found = Post.findOne({
            where: { id: id }
        });
        if(found){
            try{
                const filePath = this.savePath.concat(id, ".json");
                const isFile = fs.lstatSync(filePath).isFile();
                if(isFile){
                    const rawData = fs.readFileSync(filePath);
                    return JSON.parse(rawData);
                }
                else{
                    return false;
                }
            }
            catch(err){
                return false;
            }
        }
        else{
            return false;
        }
    }
}


export default PostTool;