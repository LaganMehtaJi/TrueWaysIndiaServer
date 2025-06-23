import express from "express";
import * as Email from "../controllers/email.controllers.js";
import {Checktoken} from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/send",Checktoken ,Email.SendEmail);
export default router;