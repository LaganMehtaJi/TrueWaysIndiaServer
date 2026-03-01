import express from "express";
const router = express.Router();
import {AddPost,EditPost,AllPost,DeletePost,GetPostByTitle} from "../controllers/vacancy.controllers.js";
router.post("/add",AddPost);
router.get("/get",AllPost);
router.post("/edit",EditPost);
router.post("/delete",DeletePost);
router.get("/get/:title",GetPostByTitle);

export default router;