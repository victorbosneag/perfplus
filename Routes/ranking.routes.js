import * as rankings from "../Controllers/ranking.controller.js";

import express from 'express';

const router = express.Router();

router.post("/create", rankings.createRanking);


export default router;