import * as contestConfig from "../Controllers/contestConfig.controller.js";
import express from "express";

const router = express.Router();


router.get("/config", contestConfig.getContestConfig);


export default router;
