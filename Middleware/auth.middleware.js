import jwt from "jsonwebtoken";
import db from "../Models/index.js";

const User = db.users;


export default async (req,res,next)=>{
    try {
        const token = req.body.token;
        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = await User.findById(verify.id);
        next();
    } catch (error) {
       return next(error); 
    }
}