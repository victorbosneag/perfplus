import * as rankings from "../Controllers/ranking.controller.js";
import express from 'express';

const router = express.Router();

router.post("/create", rankings.createRanking);
router.get("/list", rankings.getRankings);

export default router;