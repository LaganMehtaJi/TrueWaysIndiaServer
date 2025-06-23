import express from "express";
import * as Job from "../controllers/JobApply.controllers.js";
import {Checktoken} from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/send",Job.ApplyJob);
router.get("/get",Checktoken,Job.GetAllApply);
router.post("/delete",Checktoken,Job.DeleteApply);

export default router;