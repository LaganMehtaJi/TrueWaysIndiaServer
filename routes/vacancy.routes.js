import express from "express";
const router = express.Router();
import {AddPost,EditPost,AllPost,DeletePost,GetPostByTitle} from "../controllers/vacancy.controllers.js";
import { Checktoken } from "../middleware/auth.middleware.js";
router.post("/add",Checktoken,AddPost);
router.get("/get",AllPost);
router.post("/edit",Checktoken,EditPost);
router.post("/delete",Checktoken,DeletePost);
router.get("/get/:title",GetPostByTitle);

export default router;