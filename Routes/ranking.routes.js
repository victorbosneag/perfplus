import * as rankings from "../Controllers/ranking.controller.js";

import express from "express";
import auth from "../Middleware/auth.middleware.js";
import role from "../Middleware/role.middleware.js";
const router = express.Router();

router.post("/create", auth, role("Coordinator"), rankings.createRanking);

export default router;
