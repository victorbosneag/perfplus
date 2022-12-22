import * as users from "../Controllers/user.controller.js";

import express from "express";

const router = express.Router();

router.post("/create", users.create);
router.post("/login", users.login);

export default router;
