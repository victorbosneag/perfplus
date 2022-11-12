import * as contests from "../Controllers/contest.controller.js";
import express from 'express';

const router = express.Router();

router.post("/create", contests.createContest);
router.get("/list", contests.listContest);
router.get("/rankings/:contestName", contests.listRankings);

export default router;