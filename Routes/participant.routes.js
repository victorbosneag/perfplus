import * as participants from "../Controllers/participant.controller.js";
import express from "express";
import auth from "../Middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", auth, participants.createParticipant);
router.get("/list", participants.getParticipants);

export default router;
