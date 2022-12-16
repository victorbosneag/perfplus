import * as contests from "../Controllers/contest.controller.js";
import express from 'express';
import auth from "../Middleware/auth.middleware.js";
const router = express.Router();

router.post("/create", auth, contests.createContest);
router.get("/list", contests.listContest);
router.delete("/delete", auth, contests.deleteContest);

export default router;