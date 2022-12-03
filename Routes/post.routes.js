import * as posts from "../Controllers/post.controller.js";
import express from 'express';

const router = express.Router();

router.post("/create", posts.createPost);

export default router;