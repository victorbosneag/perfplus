import * as users from "../Controllers/user.controller.js";

import express from "express";
import auth from "../Middleware/auth.middleware.js"

const router = express.Router();

router.post("/create", users.create);
router.post("/login", users.login);
router.post("/info", auth, users.info)

export default router;
