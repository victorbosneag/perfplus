import jwt from "jsonwebtoken";
import db from "../Models/index.js";
import datavaluesConfig from "../Config/datavalues.config.js";
const User = db.users;
const roles = datavaluesConfig.roles;
export default (role) => {
  return async (req, res, next) => {
    try {
      const user = res.locals.user;
      console.log(user);
      if (!user) {
        return next("Please loginn to access the data");
      }
      console.log(roles);
      console.log(user.role);
      if(!(roles.includes(user.role))){
        return next("Invalid role");
      }
      if(roles.indexOf(role)>roles.indexOf(user.role))
      {
        return next("Unauthorized");
      }
      
      next();
    } catch (error) {
      return next(error);
    }
  };
};
