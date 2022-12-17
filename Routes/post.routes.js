import * as posts from "../Controllers/post.controller.js";
import express from "express";

const router = express.Router();

router.post("/create", posts.createPost);
router.post("/find", posts.findPost);

export default router;
