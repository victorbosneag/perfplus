import * as posts from "../Controllers/post.controller.js";
import express from "express";
import auth from "../Middleware/auth.middleware.js";
import role from "../Middleware/role.middleware.js";
const router = express.Router();

router.post("/create",auth, role("Coordinator"), posts.createPost);
router.post("/find", posts.findPost);
router.post("/list", posts.listPost);
export default router;
