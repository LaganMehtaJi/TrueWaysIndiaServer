import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const Checktoken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
     const token = authHeader.split(" ")[1].replace(/"/g, "");

   
    const decoded = jwt.verify(token, process.env.SECRET_KEY); 
    next(); 
  } catch (err) {
    console.error("Token error:", err.message); // 🔍 Log actual error
    return res.status(401).json({ message: "Hi Hr for security reasons, please log in again to continue." });
  }
};
