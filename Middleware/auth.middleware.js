import jwt from "jsonwebtoken";
import db from "../Models/index.js";

const User = db.users;


export default async (req,res,next)=>{
    try {
        const token = req.body.token;
        delete req.body.token;
        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,process.env.SECRET_KEY);
        console.log(verify);
        req.user = await User.findOne({where:{id:verify.id}});
        next();
    } catch (error) {
       return next(error); 
    }
}