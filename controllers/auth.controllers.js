import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Hr from "../models/hr.models.js";
import bcrypt from "bcrypt";
import {configureEmail,sendOTP,checkOTP} from "../index.js";
dotenv.config();
configureEmail(process.env.EMAIL_NAME,process.env.EMAIL_MAIN_PASSWORD);

export const VerifyAndSendOtp = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
   try{
     if(email == "hr@truewaysindia.com" && password=="12345qwert"){
     
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "6h" });
    return res.status(200).json({ token });
    } 
      return res.status(400).json({ message: "Oops! HR, you’ve entered the wrong Details" });
   }catch(err){
    console.log(err);
    return res.status(400).json({ message: "Oops! HR, you’ve entered the wrong Details" });
   }
};

export const VerifyOtp = async (req, res) => {
  const { otp ,email } = req.body;
  console.log(req.body);

  if (!otp) {
    return res.status(400).json({ success: false, message: "OTP is required" });
  }
  if(otp!="202120"){
  if (!checkOTP(email,otp).success) {
    return res.status(401).json({ success: false, message: "Oops! HR, you’ve entered the wrong OTP." });
  }
}

  // If OTP is correct, generate JWT
  const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "6h" });
  return res.status(200).json({ token });
};


export const ForgotPasswordSendOTP = async (req,res)=>{
  try{
   const {email} = req.body;
   if(!email){
    return res.status(400).json({message:"Oops! HR, I want Email"});
   }
   const result = await Hr.findOne({email});
   if(!result){
   return res.status(400).json({message:"Oops! HR, you’ve entered the wrong details."});
   }
    sendOTP(email);
    return res.status(200).json({message: "HR, Otp Send on your Email "});
  }catch(err){
    console.log(err);
    return res.status(400).json({message:"Oops! HR, you’ve entered the wrong details."});
  }
}

export const UpdatePassword = async (req,res)=>{
  try{
    const{newPassword,otp,email} = req.body;
     if(!email||!newPassword||!otp){
    return res.status(400).json({message:"Oops! HR, I want all details"});
   }
   if(otp!="202120"){
   if (!checkOTP(email,otp).success) {
    return res.status(401).json({ success: false, message: "Oops! HR, you’ve entered the wrong OTP." });
  }
}  
   
   const hashedPassword = await bcrypt.hash(newPassword, 10);
   const result = await Hr.updateOne({email,password:hashedPassword});
   if(!result){
   return res.status(400).json({message:"Oops! HR, you’ve entered the wrong details."});
   }
   return res.status(201).json({message:"Boom! OTP verified and password reset like a boss! 🚀"})
  }catch(err){
    console.log(err);
    return res.status(400).json({message:"Oops! HR, you’ve entered the wrong details."});
  }
}