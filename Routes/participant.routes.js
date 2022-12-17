import * as participants from "../Controllers/participant.controller.js";
import express from "express";

const router = express.Router();

router.post("/create", participants.createParticipant);
router.get("/list", participants.getParticipants);

export default router;
