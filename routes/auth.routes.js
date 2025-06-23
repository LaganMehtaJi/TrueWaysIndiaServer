import express from "express";
import * as Auth from "../controllers/auth.controllers.js";
const router = express.Router();
router.post("/send",Auth.VerifyAndSendOtp);
router.post("/verify",Auth.VerifyOtp);
router.post("/forgot",Auth.ForgotPasswordSendOTP);
router.post("/update",Auth.UpdatePassword);

export default router;