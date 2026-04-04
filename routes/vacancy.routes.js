import express from "express";
const router = express.Router();
import {AddPost,EditPost,AllPost,DeletePost} from "../controllers/vacancy.controllers.js";
router.post("/add",AddPost);
router.get("/get",AllPost);
router.post("/edit",EditPost);
router.delete('/delete/:id', DeletePost);

export default router;