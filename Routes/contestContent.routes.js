import * as contestConfig from "../Controllers/contestConfig.controller.js";
import express from "express";
import auth from "../Middleware/auth.middleware.js";
import role from "../Middleware/role.middleware.js";
const router = express.Router();


router.get("/config", contestConfig.getContestConfig);
router.post("/upload",auth, role("Teacher"), contestConfig.parseFileUpload);


export default router;
